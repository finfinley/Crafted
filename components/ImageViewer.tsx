import { StyleSheet, Image } from 'react-native';

type ImageViewerProps = {
  defaultImage: any
  selectedImage?: any
}

export default function ImageViewer({ defaultImage, selectedImage }: ImageViewerProps) {
  const imageSource = selectedImage ? { uri: selectedImage } : defaultImage;

    return (
        <Image source={imageSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });