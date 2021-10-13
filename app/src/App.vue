<template lang="html">
    
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Home"></Label>
                <Image src.decode="font://&#xf015;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Browse"></Label>
                <Image src.decode="font://&#xf1ea;" class="far t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Search"></Label>
                <Image src.decode="font://&#xf002;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame id="home">
                <Home/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="browse">
                <Browse/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="search">
                <CreatePost />
            </Frame>
        </TabContentItem>


    </BottomNavigation> 
</template>

<script>
  import Home from "./pages/home/Home.vue";
  import Browse from "./components/Browse.vue";
  import CreatePost from "./pages/home/CreatePost.vue";
 

  export default {
    components: {
      Home,
      Browse,
      CreatePost    }
  };
</script>

<style lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
