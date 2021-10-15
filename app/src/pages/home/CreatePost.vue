
<template>
    <Page>
        <ActionBar>
          <StackLayout orientation="horizontal">
            <Label text="Post a message"></Label>
            <Button v-if="messageContent.length === 3" @tap="postMessage">Send</Button>
          </StackLayout>
        </ActionBar>
        <StackLayout>
          <StackLayout padding="10" backgroundColor="#f2ef23" orientation="horizontal">
            <FlexboxLayout marginLeft="5" padding="5" borderWidth="1" borderRadius="10" orientation="horizontal">
              <Label marginLeft="4" class="fa" :text="'fa-clock-o' | fonticon"></Label>
              <Label marginLeft="5" text="Direct"></Label>
              <Label marginLeft="5" marginRight="5" class="fa" :text="'fa-caret-down' | fonticon"></Label>
            </FlexboxLayout>
            <FlexboxLayout marginLeft="10" padding="5" borderWidth="1" borderRadius="10" orientation="horizontal">
              <Label marginLeft="4" class="fa" :text="'fa-clock-o' | fonticon"></Label>
              <Label marginLeft="5" text="Direct"></Label>
              <Label marginLeft="5" marginRight="5" class="fa" :text="'fa-caret-down' | fonticon"></Label>
            </FlexboxLayout>
          </StackLayout>
          <StackLayout>
            <TextField v-model="messageContent" />
          </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  import * as imagepicker from "@nativescript/imagepicker";
  import { apolloClient } from '../../../app.js'
  import { gql } from "apollo-boost";
  import {Image} from 'tns-core-modules/ui/image';
import {File, knownFolders, path} from 'tns-core-modules/file-system';
import {ImageSource} from 'tns-core-modules/image-source';
import fileSystemModule from "tns-core-modules/file-system";


  export default {
  
    data() {
      return {
        messageContent: '',
        imagePicker: imagepicker,
        img: null,
        imgg: null,
      };
    },
    mounted(){
      this.openImagePicker()
    },
    methods:{
      openImagePicker() {
      const context = imagepicker.create({
        mode: this.multiple ? 'multiple' : 'single',
        minimumNumberOfSelection: 1,
        maximumNumberOfSelection: 1,
      });

      context
        .authorize()
        .then(() => context.present())
        .then((selection) => {
          selection.forEach((selected) => {
            let imageSource = new ImageSource();

            imageSource.fromAsset(selected)
              .then(() => {
                if (selected.android) {
                  this.saveFile(selected.android.toString());
                } else {
                  const ios = selected.ios;

                  if (ios.mediaType === PHAssetMediaType.Image) {
                    const opt = PHImageRequestOptions.new();
                    opt.version = PHImageRequestOptionsVersion.Current;

                    PHImageManager.defaultManager()
                      .requestImageDataForAssetOptionsResultHandler(ios, opt, (imageData, dataUTI, orientation, info) => {
                      this.imgg = imageData
                      this.saveFile(info.objectForKey('PHImageFileURLKey').toString());
                    });
                  }
                }
              });
          });
        });
      },
      
      saveFile(source, saveIt = false) {
        const image = new Image();
        const folderPath = knownFolders.documents().path;

        image.src = source;

        const fileName = image.src.toString().split('/').pop();
        const filePath = path.join(folderPath, fileName);
        
        if (saveIt) {
          const imageSource = new ImageSource();
          const saved = imageSource.saveToFile(filePath, 'png');

          if (!saved) {
            console.log('[UploadFile] - Cannot save file!');
          }
        }
        
        this.img = File.fromPath(filePath).readSync((err) => {
          if(err) console.log('err', err);
        });
        console.log('[UploadField] -->', fileName);
      },
      
      submit() {
        const params = new FormData();
        params.append('file', this.img);
      
        axios({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
          params,
        })
          .then((response) => console.log(response));
      },

      async postMessage(){
        try{
          const { data } = await apolloClient.mutate({
            mutation: gql`
            mutation($data: PostInput!){
              CreatePost(data: $data)
            }`,
            variables:{
              data: { 
                message: this.messageContent,
                user: "61630e3c0665df912b3d9d8a",
                img: this.imgg
                }
            }
          })
          if(data.CreatePost) this.$navigator.back()
          console.log('Post not created')
          // Show warning that somethign went wrong!
        } catch (e){
          // Show warning that somethign went wrong!
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
