export type ParticlesBgProps = {
    type?: 'cobweb' | 'dots' | 'lines';
    bg?: boolean;
    num?: number;
    color?: string;
}

export type ParticlesNotFoundProps = {
    x: number
    y: number
    baseX: number
    baseY: number
    size: number
    color: string
    scatteredColor: string
    life: number
}