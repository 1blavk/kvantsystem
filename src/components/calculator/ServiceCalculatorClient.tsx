'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  Search,
  Check,
  Plus,
  Trash2,
  Clock,
  Phone,
  Send,
  Copy,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  MonitorCog,
  Store,
  Globe,
  CirclePlus,
  Printer,
  ChevronRight,
  Info
} from 'lucide-react';
import { Link } from '@/src/i18n/navigation';
import LazyImage from '@/src/components/LazyImage';
import { ServiceDataType } from '@/src/app/data/servicesData';
import { commonData } from '@/src/data/common';
import clsx from 'clsx';

interface ServiceCalculatorClientProps {
  services: ServiceDataType[];
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    badge: string;
    filter_all: string;
    filter_security: string;
    filter_infrastructure: string;
    filter_network: string;
    filter_support: string;
    search_placeholder: string;
    selected_summary_title: string;
    empty_cart_title: string;
    empty_cart_desc: string;
    estimated_total: string;
    som_equivalent: string;
    estimated_time: string;
    days: string;
    clear_all: string;
    add_to_quote: string;
    added: string;
    remove_item: string;
    select_tier: string;
    extra_options_title: string;
    express_title: string;
    express_desc: string;
    warranty_title: string;
    warranty_desc: string;
    send_telegram: string;
    call_button: string;
    copy_quote: string;
    copied: string;
    currency_note: string;
    back_to_services: string;
    request_consultation: string;
    form_name: string;
    form_phone: string;
    form_object: string;
    form_notes: string;
    form_submit: string;
    form_success: string;
    services_tab: string;
    store_tab: string;
    software_tab: string;
    calculate_tab: string;
  };
}

interface CartItem {
  serviceId: number;
  tierIndex: number;
  quantity: number;
}

const USD_TO_UZS = 12800;

export default function ServiceCalculatorClient({
  services,
  locale,
  translations: t,
}: ServiceCalculatorClientProps) {
  // Selected category filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'infra' | 'network' | 'support'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state: map of serviceId -> CartItem
  const [cart, setCart] = useState<Record<number, CartItem>>({
    // Pre-select CCTV for quick engagement demonstration
    1: { serviceId: 1, tierIndex: 0, quantity: 1 },
    3: { serviceId: 3, tierIndex: 0, quantity: 1 },
  });

  // Track tier selection for services before or after adding
  const [selectedTiers, setSelectedTiers] = useState<Record<number, number>>({
    1: 0,
    3: 0,
  });

  // Additional add-ons
  const [expressSetup, setExpressSetup] = useState(false);
  const [extendedWarranty, setExtendedWarranty] = useState(false);

  // UI status
  const [copied, setCopied] = useState(false);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientObject, setClientObject] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Helper to extract numeric price from "$150" or "$120/mo"
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Helper to format currency
  const formatUzs = (amount: number): string => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      // Category match
      if (activeCategory === 'security') {
        if (!['cctv', 'access-control', 'cyber-security'].includes(srv.slug)) return false;
      } else if (activeCategory === 'infra') {
        if (!['server', 'it-infrastructure', 'cloud-solutions'].includes(srv.slug)) return false;
      } else if (activeCategory === 'network') {
        if (!['network', 'wifi', 'intercom'].includes(srv.slug)) return false;
      } else if (activeCategory === 'support') {
        if (!['smart-home', 'tech-support', 'maintenance'].includes(srv.slug)) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = srv.title[locale as keyof typeof srv.title]?.toLowerCase().includes(q);
        const keywordMatch = srv.keywords.some((k) => k.toLowerCase().includes(q));
        if (!titleMatch && !keywordMatch) return false;
      }

      return true;
    });
  }, [services, activeCategory, searchQuery, locale]);

  // Handle tier selection for a service
  const handleSelectTier = (serviceId: number, tierIdx: number) => {
    setSelectedTiers((prev) => ({ ...prev, [serviceId]: tierIdx }));
    // If already in cart, update cart tier as well
    if (cart[serviceId]) {
      setCart((prev) => ({
        ...prev,
        [serviceId]: { ...prev[serviceId], tierIndex: tierIdx },
      }));
    }
  };

  // Toggle item in cart
  const toggleCartItem = (serviceId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[serviceId]) {
        delete next[serviceId];
      } else {
        const tierIdx = selectedTiers[serviceId] ?? 0;
        next[serviceId] = {
          serviceId,
          tierIndex: tierIdx,
          quantity: 1,
        };
      }
      return next;
    });
  };

  // Adjust quantity
  const updateQuantity = (serviceId: number, delta: number) => {
    setCart((prev) => {
      const current = prev[serviceId];
      if (!current) return prev;
      const newQty = Math.max(1, Math.min(20, current.quantity + delta));
      return {
        ...prev,
        [serviceId]: { ...current, quantity: newQty },
      };
    });
  };

  // Remove from cart
  const removeFromCart = (serviceId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[serviceId];
      return next;
    });
  };

  // Clear all
  const clearCart = () => {
    setCart({});
    setExpressSetup(false);
    setExtendedWarranty(false);
  };

  // Calculated figures
  const { totalUsd, totalUzs, itemsCount, maxDays, itemizedBreakdown } = useMemo(() => {
    let subtotalUsd = 0;
    let daysMax = 0;
    const breakdown: Array<{
      id: number;
      title: string;
      tierName: string;
      tierValue: string;
      unitPrice: number;
      quantity: number;
      lineTotal: number;
      spendStr: string;
    }> = [];

    Object.values(cart).forEach((item) => {
      const srv = services.find((s) => s.id === item.serviceId);
      if (!srv) return;

      const langKey = (locale as 'en' | 'uz' | 'ru') || 'uz';
      const criteriaList = srv.pricing_criterias[langKey] || srv.pricing_criterias.uz;
      const tier = criteriaList[item.tierIndex] || criteriaList[0];
      const unitPrice = parsePrice(tier.price);
      const lineTotal = unitPrice * item.quantity;
      subtotalUsd += lineTotal;

      // Extract days estimate
      const spend = srv.spend[langKey] || srv.spend.uz;
      const numMatch = spend.match(/(\d+)(?:-(\d+))?/);
      if (numMatch) {
        const daysVal = numMatch[2] ? parseInt(numMatch[2], 10) : parseInt(numMatch[1], 10);
        if (daysVal > daysMax) daysMax = daysVal;
      }

      breakdown.push({
        id: srv.id,
        title: srv.title[langKey] || srv.title.uz,
        tierName: tier.name,
        tierValue: tier.value,
        unitPrice,
        quantity: item.quantity,
        lineTotal,
        spendStr: spend,
      });
    });

    if (expressSetup) {
      subtotalUsd += 50;
      if (daysMax > 2) daysMax = 2; // Express completes in 2 days
    }
    if (extendedWarranty) {
      subtotalUsd += 80;
    }

    const uzs = subtotalUsd * USD_TO_UZS;
    return {
      totalUsd: subtotalUsd,
      totalUzs: uzs,
      itemsCount: Object.keys(cart).length,
      maxDays: daysMax === 0 ? 1 : daysMax,
      itemizedBreakdown: breakdown,
    };
  }, [cart, services, locale, expressSetup, extendedWarranty]);

  // Generate plain text estimate for Telegram or clipboard
  const generateEstimateText = (clientDetails?: { name?: string; phone?: string; object?: string; notes?: string }) => {
    let msg = `KVANT SYSTEM - XIZMATLAR SMETASI:\n`;
    if (clientDetails?.name || clientDetails?.phone) {
      msg += `Mijoz: ${clientDetails.name || 'Noma\'lum'} (${clientDetails.phone || '-'})\n`;
      if (clientDetails.object) msg += `Ob'yekt: ${clientDetails.object}\n`;
      if (clientDetails.notes) msg += `Izoh: ${clientDetails.notes}\n`;
      msg += `------------------------------------\n`;
    }

    msg += `Tanlangan xizmatlar (${itemsCount} ta):\n`;
    itemizedBreakdown.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.title} [${item.tierName}: ${item.tierValue}] x${item.quantity} = $${item.lineTotal}\n`;
    });

    if (expressSetup) msg += `+ Tezkor montaj (Express 24-48 soat): $50\n`;
    if (extendedWarranty) msg += `+ 1 yillik kengaytirilgan kafolat: $80\n`;

    msg += `------------------------------------\n`;
    msg += `JAMI: $${totalUsd} (~${formatUzs(totalUzs)} so'm)\n`;
    msg += `Taxminiy muddat: ${maxDays} ${t.days}\n`;
    msg += `Aloqa: ${commonData.socials.phone} | https://kvantsystem.uz`;

    return msg;
  };

  // Open Telegram with pre-filled message
  const handleSendTelegram = () => {
    const text = generateEstimateText({
      name: clientName,
      phone: clientPhone,
      object: clientObject,
      notes: clientNotes,
    });
    const telegramUrl = `https://t.me/kvantsuz?text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy estimate to clipboard
  const handleCopyQuote = () => {
    const text = generateEstimateText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Submit consultation form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Open Telegram with filled details
    handleSendTelegram();
  };

  const navTabBase = "text-sm cursor-pointer flex items-center gap-2 border-2 border-dashed rounded-full p-2 px-4 border-white/20 transition";
  const navTabActive = "bg-white/10 text-white shadow-sm";
  const navTabInactive = "text-white/50 hover:bg-white/10";

  return (
    <div className="mb-32">
      {/* ================= HERO / TOP NAV HEADER ================= */}
      <div className="pt-36 pb-12 mx-auto px-6 bg-[#1E2E3E]">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#01C38E]/20 text-[#01C38E] border border-[#01C38E]/30">
              <Sparkles size={14} />
              {t.badge}
            </span>
          </div>

          <h1 className="font-bold uppercase text-3xl md:text-5xl sm:text-4xl text-center leading-tight mb-6 bg-gradient-to-t to-[#0EA37F] from-[#01C38E] text-transparent bg-clip-text">
            {t.title}
          </h1>

          <p className="mb-10 text-center text-lg md:text-xl max-w-2xl mx-auto font-normal text-white/60 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4">
            <Link href="/services" className={clsx(navTabBase, navTabInactive)}>
              <MonitorCog size={16} strokeWidth={1} />
              <span>{t.services_tab}</span>
            </Link>

            <Link href="/services" className={clsx(navTabBase, navTabInactive)}>
              <Store size={16} strokeWidth={1} />
              <span>{t.store_tab}</span>
            </Link>

            <Link href="/services" className={clsx(navTabBase, navTabInactive)}>
              <Globe size={16} strokeWidth={1} />
              <span>{t.software_tab}</span>
            </Link>

            <Link href="/services/calculate" className={clsx(navTabBase, navTabActive)}>
              <CirclePlus strokeWidth={1} size={16} className="text-[#01C38E]" />
              <span className="text-white font-medium">{t.calculate_tab}</span>
              <span>|</span>
              <div className="bg-[#01C38E] text-gray-900 px-1.5 py-0.5 rounded-full">
                <p className="text-[11px] font-bold">{itemsCount}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAIN CALCULATOR WORKSPACE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {/* Controls: Search and Categories */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={clsx(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer',
                activeCategory === 'all'
                  ? 'bg-[#1E2E3E] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.filter_all} ({services.length})
            </button>
            <button
              onClick={() => setActiveCategory('security')}
              className={clsx(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer',
                activeCategory === 'security'
                  ? 'bg-[#1E2E3E] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.filter_security}
            </button>
            <button
              onClick={() => setActiveCategory('infra')}
              className={clsx(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer',
                activeCategory === 'infra'
                  ? 'bg-[#1E2E3E] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.filter_infrastructure}
            </button>
            <button
              onClick={() => setActiveCategory('network')}
              className={clsx(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer',
                activeCategory === 'network'
                  ? 'bg-[#1E2E3E] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.filter_network}
            </button>
            <button
              onClick={() => setActiveCategory('support')}
              className={clsx(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer',
                activeCategory === 'support'
                  ? 'bg-[#1E2E3E] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.filter_support}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#01C38E]/50 focus:border-[#01C38E]"
            />
          </div>
        </div>

        {/* Workspace Grid: Services on Left, Quote Drawer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT: SERVICES CATALOG (8 COLS) ================= */}
          <div className="lg:col-span-8 space-y-4">
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                <Search size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 font-medium">Hech qanday xizmat topilmadi</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 text-xs text-[#01C38E] font-semibold hover:underline"
                >
                  Filtrni bekor qilish
                </button>
              </div>
            ) : (
              filteredServices.map((srv) => {
                const langKey = (locale as 'en' | 'uz' | 'ru') || 'uz';
                const srvTitle = srv.title[langKey] || srv.title.uz;
                const criteriaList = srv.pricing_criterias[langKey] || srv.pricing_criterias.uz;
                const isSelected = !!cart[srv.id];
                const activeTierIndex = isSelected
                  ? cart[srv.id].tierIndex
                  : selectedTiers[srv.id] ?? 0;
                const activeTier = criteriaList[activeTierIndex] || criteriaList[0];
                const activePrice = activeTier.price;

                return (
                  <div
                    key={srv.id}
                    className={clsx(
                      'bg-white rounded-2xl border p-4 sm:p-5 transition-all duration-200',
                      isSelected
                        ? 'border-[#01C38E] ring-2 ring-[#01C38E]/20 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    )}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 flex items-center justify-center">
                          <LazyImage
                            w={80}
                            h={80}
                            src={srv.photo}
                            alt={srvTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {srvTitle}
                            </h3>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#01C38E]/15 text-[#008f68]">
                                {t.added}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Clock size={12} />
                            <span>
                              {t.estimated_time}: {srv.spend[langKey] || srv.spend.uz}
                            </span>
                          </div>

                          {/* Tier selection buttons */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-500">{t.select_tier}</span>
                            {criteriaList.map((tier, idx) => {
                              const isTierActive = activeTierIndex === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleSelectTier(srv.id, idx)}
                                  className={clsx(
                                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer',
                                    isTierActive
                                      ? 'bg-[#1E2E3E] text-white border-[#1E2E3E]'
                                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                  )}
                                >
                                  {tier.name}: {tier.value} ({tier.price})
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Add Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-3">
                        <div className="text-left sm:text-right">
                          <p className="text-xl sm:text-2xl font-bold text-gray-900">{activePrice}</p>
                          <p className="text-[11px] text-gray-500">
                            ≈ {formatUzs(parsePrice(activePrice) * USD_TO_UZS)} {t.som_equivalent}
                          </p>
                        </div>

                        {isSelected ? (
                          <div className="flex items-center gap-2">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(srv.id, -1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition cursor-pointer text-sm"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold text-gray-800">
                                {cart[srv.id].quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(srv.id, 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition cursor-pointer text-sm"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleCartItem(srv.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 size={13} />
                              <span className="hidden sm:inline">{t.remove_item}</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleCartItem(srv.id)}
                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#01C38E] text-gray-900 hover:bg-[#00ab7c] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <Plus size={14} />
                            <span>{t.add_to_quote}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Extra Options / Add-ons Card */}
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl border border-gray-200 p-6 mt-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-[#01C38E]" />
                {t.extra_options_title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Express Setup */}
                <label
                  className={clsx(
                    'p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition',
                    expressSetup
                      ? 'bg-white border-[#01C38E] shadow-sm'
                      : 'bg-white/70 border-gray-200 hover:border-gray-300'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={expressSetup}
                    onChange={(e) => setExpressSetup(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded text-[#01C38E] focus:ring-[#01C38E] border-gray-300"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-500" />
                      <span className="text-sm font-semibold text-gray-900">{t.express_title}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{t.express_desc}</p>
                  </div>
                </label>

                {/* Extended Warranty */}
                <label
                  className={clsx(
                    'p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition',
                    extendedWarranty
                      ? 'bg-white border-[#01C38E] shadow-sm'
                      : 'bg-white/70 border-gray-200 hover:border-gray-300'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={extendedWarranty}
                    onChange={(e) => setExtendedWarranty(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded text-[#01C38E] focus:ring-[#01C38E] border-gray-300"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span className="text-sm font-semibold text-gray-900">{t.warranty_title}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{t.warranty_desc}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: ESTIMATED QUOTE SIDEBAR (4 COLS) ================= */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-100/60 p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Calculator size={20} className="text-[#01C38E]" />
                  <h3 className="font-bold text-gray-900 text-lg">{t.selected_summary_title}</h3>
                </div>
                {itemsCount > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-rose-500 transition cursor-pointer"
                  >
                    {t.clear_all}
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {itemsCount === 0 ? (
                  <div className="text-center py-8 px-4">
                    <CirclePlus size={36} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-semibold text-gray-700">{t.empty_cart_title}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.empty_cart_desc}</p>
                  </div>
                ) : (
                  itemizedBreakdown.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-2 border-b border-gray-50 last:border-b-0"
                    >
                      <div className="pr-2 max-w-[65%]">
                        <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                        <p className="text-gray-500 text-[11px]">
                          {item.tierName} ({item.tierValue}) × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">${item.lineTotal}</span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* Add-ons in breakdown */}
                {expressSetup && (
                  <div className="flex items-center justify-between text-xs py-1.5 text-amber-700 bg-amber-50/60 px-2 rounded-lg">
                    <span className="font-medium flex items-center gap-1">
                      <Zap size={12} /> {t.express_title}
                    </span>
                    <span className="font-bold">+$50</span>
                  </div>
                )}
                {extendedWarranty && (
                  <div className="flex items-center justify-between text-xs py-1.5 text-emerald-700 bg-emerald-50/60 px-2 rounded-lg">
                    <span className="font-medium flex items-center gap-1">
                      <ShieldCheck size={12} /> {t.warranty_title}
                    </span>
                    <span className="font-bold">+$80</span>
                  </div>
                )}
              </div>

              {/* Totals Section */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-500">{t.estimated_total}</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-gray-900">${totalUsd}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{t.som_equivalent}</span>
                  <span className="font-semibold text-gray-700">{formatUzs(totalUzs)} UZS</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl">
                  <span className="flex items-center gap-1.5 font-medium text-gray-700">
                    <Clock size={14} className="text-[#01C38E]" />
                    {t.estimated_time}
                  </span>
                  <span className="font-bold text-gray-900">
                    ~{maxDays} {t.days}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                {/* Send via Telegram */}
                <button
                  type="button"
                  onClick={handleSendTelegram}
                  disabled={itemsCount === 0}
                  className={clsx(
                    'w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md',
                    itemsCount > 0
                      ? 'bg-[#01C38E] text-gray-900 hover:bg-[#00ab7c] shadow-emerald-500/20'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  )}
                >
                  <Send size={16} />
                  <span>{t.send_telegram}</span>
                </button>

                {/* Call Specialist */}
                <a
                  href={`tel:${commonData.socials.phone}`}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone size={14} />
                  <span>
                    {t.call_button} ({commonData.socials.phone})
                  </span>
                </a>

                {/* Secondary buttons: Copy & Print */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    disabled={itemsCount === 0}
                    className="py-2 px-3 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 transition text-gray-600 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{t.copy_quote}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    disabled={itemsCount === 0}
                    className="py-2 px-3 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 transition text-gray-600 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Printer size={13} />
                    <span>Chop etish (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Consultation trigger toggle */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowConsultForm(!showConsultForm)}
                  className="w-full text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center justify-between cursor-pointer py-1"
                >
                  <span>{t.request_consultation}</span>
                  <ChevronRight
                    size={14}
                    className={clsx('transition-transform', showConsultForm && 'rotate-90')}
                  />
                </button>

                {showConsultForm && (
                  <form onSubmit={handleFormSubmit} className="mt-3 space-y-2.5">
                    {formSubmitted ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                        <CheckCircle2 size={24} className="mx-auto text-emerald-600 mb-1" />
                        <p className="text-xs font-semibold text-emerald-800">{t.form_success}</p>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder={t.form_name}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#01C38E]"
                        />
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder={t.form_phone}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#01C38E]"
                        />
                        <input
                          type="text"
                          value={clientObject}
                          onChange={(e) => setClientObject(e.target.value)}
                          placeholder={t.form_object}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#01C38E]"
                        />
                        <textarea
                          rows={2}
                          value={clientNotes}
                          onChange={(e) => setClientNotes(e.target.value)}
                          placeholder={t.form_notes}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#01C38E] resize-none"
                        />
                        <button
                          type="submit"
                          disabled={itemsCount === 0}
                          className="w-full py-2 bg-[#1E2E3E] text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer"
                        >
                          {t.form_submit}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>

              {/* Note */}
              <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-400 bg-gray-50/80 p-2.5 rounded-xl">
                <Info size={14} className="shrink-0 text-gray-400 mt-0.5" />
                <p className="leading-tight">{t.currency_note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
