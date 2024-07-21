import { StyleSheet, Image } from "react-native";

type ImageViewerProps = {
  defaultImage: any;
  selectedImage?: any;
  styles?: any;
};

export default function ImageViewer({
  defaultImage,
  selectedImage,
  styles,
}: ImageViewerProps) {
  const imageSource = selectedImage ? { uri: selectedImage } : defaultImage;

  return <Image source={imageSource} style={styles} />;
}
