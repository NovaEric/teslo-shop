import Image from "next/image";
import { StyleHTMLAttributes } from "react";

interface Props {
    src?: string;
    alt: string;
    className?: StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
}

export const ProductImage = ({ src, alt, className, style, width, height }: Props) => {
    const localScr = src ? src.startsWith('http') ? src : `/products/${src}` : '/imgs/placeholder.jpg'
    return <Image
        src={localScr}
        width={width}
        height={height}
        alt={alt}
        className={className}
        style={style}
    />
}
