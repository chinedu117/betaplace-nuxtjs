var UploadImage = {
    data(){
        return {
           imageName : '', //file Name
           imageUrl: '', //base64Uri
           imageFile: '',
           in_maxWidth: "700",
           in_maxHeight: "500",
           in_compressionQuality: "0.8",
           imageBlob: '', //to be sent to the server,  FormData().append('image',this.imageBlob)
        }
    },
    
    methods:{
        //click event on the visible trigger
        pickFile () {
            this.$refs.image.click () //define ref 'image' on the file selector
        },
		//onchange event on the hidden file selector
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
        const sm = this
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                    let image = new Image()
                    let newSize 
                    // console.log("image_before",image.naturalWidth,image.naturalHeight)
                    image.onload = () =>{
                        newSize = sm.calculateAspectRatioFit(image.naturalWidth,
                                                image.naturalHeight,
                                                 sm.in_maxWidth,
                                                  sm.in_maxHeight,
                                                  sm.in_compressionQuality)
                        sm.imageFile = sm.imageToDataUri(image,newSize.width,newSize.height,newSize.quality)
                        sm.imageUrl = sm.imageToDataUri(image,newSize.width,newSize.height,newSize.quality)
                        sm.imageBlob =  sm.convertImageToBlob(sm.imageUrl,'image/jpeg')
                        // console.log(sm.imageBlob);
                       
                    }
                    image.src = fr.result
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        
     
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight,compressionQuality = 0.5) {
            // console.log("max",maxWidth,maxHeight,compressionQuality)
        var maxWidth = maxWidth // Max width for the image
        var maxHeight = maxHeight   // Max height for the image
        var ratio = 0  // Used for aspect ratio
        var width = srcWidth    // Current image width
        var height = srcHeight // Current image height
        var quality = compressionQuality
        var imgRatio = srcWidth/srcHeight
        var maxRatio =  maxWidth/maxHeight
        // Check if the current width is larger than the max
        if(srcHeight > maxHeight || srcWidth > maxWidth){
            if(imgRatio < maxRatio){
                    //adjust width
                    imgRatio = maxHeight /height

                    height = maxHeight    // Reset height to match scaled image
                    width = imgRatio * width   // Reset width to match scaled image

                }else if(imgRatio  > maxRatio){
                    //adjust height
                    imgRatio  = maxWidth / srcWidth // get ratio for scaling image
                   
                    width = maxWidth    // Reset width to match scaled image
                    height = imgRatio * height    // Reset height to match scaled image
                }else{
                    
                    width = maxWidth
                    height = maxHeight
                    quality = 1
                }
        }
                 // console.log("cal",width,height,quality)
           return { 'width': width, 'height': height, 'quality': quality }
    },

    imageToDataUri(img, width, height,quality) {

        // create an off-screen canvas
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        // draw source image into the off-screen canvas:
        ctx.drawImage(img, 0, 0, width, height);

        // encode image to data-uri with base64 version of compressed image
        //  return canvas.toDataURL();
         return canvas.toDataURL('image/jpeg', quality);  // quality = [0.0, 1.0]

},

    convertImageToBlob(imageBase64,mimeType){
       let base64ImageContent  =  imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/ ,"")
       let mime = mimeType || ''
       let sliceSize = 1024
      // console.log(base64ImageContent)
       let byteChars = window.atob(base64ImageContent)
       let byteArrays  = []

       for( var offset = 0, len = byteChars.length; offset < len; offset += sliceSize){
            var slice = byteChars.slice(offset, offset + sliceSize)

            var byteNumbers = new Array(slice.length)
            for( var i = 0; i < slice.length; i++){
                byteNumbers[i] = slice.charCodeAt(i)
            }
            var byteArray = new Uint8Array(byteNumbers)
            
            byteArrays.push(byteArray)
       }
           
           
            return new Blob(byteArrays, {type: mime})
         
    },
            
    }
  
  }//end of obj
  
  export default UploadImage