<template>
    <div id="wrapper">
        <div id="salon">
            <h2>Liste salon</h2>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Connexion',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @font-face {
      font-family: Poppins-Regular;
      src: url('../assets/poppins/Poppins-Regular.ttf'); 
    }

    @font-face {
      font-family: Poppins-Medium;
      src: url('../assets/poppins/Poppins-Medium.ttf'); 
    }

    @font-face {
      font-family: Poppins-Bold;
      src: url('../assets/poppins/Poppins-Bold.ttf'); 
    }

    @font-face {
      font-family: Poppins-SemiBold;
      src: url('../assets/poppins/Poppins-SemiBold.ttf'); 
    }
    
    
    body{
        background-image: url('../assets/bg.jpg');
        background-size: cover;
    }
    
    #wrapper{
        width: 450px;
        background-color: white;
        margin-top: 10vh;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50px;
    }
    
    #salon>h2{
        font-family: Poppins-Bold;
        text-align: center;
        padding-top: 20px;
    }


</style>
