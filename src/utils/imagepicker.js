import ImagePicker from 'react-native-image-crop-picker';
import { ImagesSchema } from '../constants';
import { Toast } from 'native-base';

export const camera = (setImage) => {
    ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
    })
    .then(image => {
        ImagesSchema.validate(image.mime)
        .then(() => setImage(image.path))
        .catch(err => Toast.show({
            text: err.errors,
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "warning"
        }))
    })
    .catch(err=>{

    })
};

export const galery = (setData, multiple = false) => {
    ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        multiple: multiple
    })
    .then(data => {
        if(multiple) multipleImg(data, setData);
        else uniqueImg(data, setData)
    })
    .catch(err => {

    })
}

const multipleImg = async (data, setImages) => {
    let images = []
    for (const img of data) {
       try {
           await ImagesSchema.validate(img.mime)
           images.push(img.path);
       } catch (error) {               
            return Toast.show({
                text: error.errors,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: "warning"
            })
       } 
    }
    
    setImages(images);
};

const uniqueImg = async (image, setImage) => {
    try {
        await ImagesSchema.validate(image.mime)
        setImage(image.path)
    } catch (error) {
        return Toast.show({
            text: error.errors,
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "warning"
        })
    }
};