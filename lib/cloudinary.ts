export function getCldImageUrl({
    src,
    width,
    height,
    quality = 'auto',
    fetchFormat = 'auto',
    ...rest
  }: {
    src: string;
    width?: number;
    height?: number;
    quality?: string;
    fetchFormat?: string;
    [key: string]: any;
  }) {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  
    const transformations: string[] = [];
  
    if (quality) transformations.push(`q_${quality}`);
    if (fetchFormat) transformations.push(`f_${fetchFormat}`);
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
  
    // Add custom transformation keys
    Object.entries(rest).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        transformations.push(`${key}_${value}`);
      }
    });
  
    const transformationString = transformations.join(',');
  
    return `${baseUrl}/${transformationString}/${src}`;
  }
  