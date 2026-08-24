import Image, { type ImageProps } from "next/image";

export default function AppImage(props: ImageProps) {
  const { alt, ...imageProps } = props;

  return <Image alt={alt} {...imageProps} />;
}
