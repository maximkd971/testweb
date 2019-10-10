<template>
    <div id="wrapper">
        <div id="connexion">
            <h2>Login</h2>
            <form id="connexionForm" method="" action="/salons">
                <input class="form-input" type="text" placeholder="Username" name="username" /><br /><br />
                <input class="form-input" type="password" placeholder="Password" name="Password" /><br /><br />
                
                <button class="form-button" type="submit">Se connecter</button>
            </form>
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
    
    #connexion>h2{
        font-family: Poppins-Bold;
        text-align: center;
        padding-top: 20px;
    }
    
    #connexionForm{
        width: 80%;
        margin: auto;
    }
    
    #connexionForm>label{
        font-family: Poppins-Regular;
    }
    
    .form-input{
        border: none;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        width: 100%;
        height: 20px;
        margin-bottom: 20px;
    }

.form-button {
  font-family: Poppins-Medium;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
    border-radius: 20px;
    margin-bottom: 30px;
    border: none;
    
    
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#869af3+0,7d91f0+0,7a91ef+1,7c93f1+1,779aee+5,7498ec+6,749aef+6,739bf0+8,719bed+8,709fef+10,6e9feb+11,69a5ee+15,62a9eb+19,61aaee+21,60aaeb+21,5eaeed+25,58b1eb+27,56b5ed+31,55b4ea+31,54b5ea+32,50b9e9+34,50baec+34,4fb9e9+35,4cbcea+38,4cbce4+39,4dbee8+39,48beec+39,3bb8e8+39,37b3e6+39,39b6e6+39,34b6e7+40,34b8e8+42,31bae4+43,31bce7+44,2ebbe6+45,29c4e3+53,25c4e2+55,26c7e3+56,23c7e2+56,22c8e2+58,24c8e4+58,22c7e3+59,20cae4+59,1dcbe3+63,1dcee2+63,1bcee4+66,19cee1+66,15d3e3+71,12d6e2+77,10d9e3+78,11d7e2+78,0cdce0+85,09dde0+86,09dde0+100,1be0e6+100 */
background: #869af3; /* Old browsers */
background: -moz-linear-gradient(45deg,  #869af3 0%, #7d91f0 0%, #7a91ef 1%, #7c93f1 1%, #779aee 5%, #7498ec 6%, #749aef 6%, #739bf0 8%, #719bed 8%, #709fef 10%, #6e9feb 11%, #69a5ee 15%, #62a9eb 19%, #61aaee 21%, #60aaeb 21%, #5eaeed 25%, #58b1eb 27%, #56b5ed 31%, #55b4ea 31%, #54b5ea 32%, #50b9e9 34%, #50baec 34%, #4fb9e9 35%, #4cbcea 38%, #4cbce4 39%, #4dbee8 39%, #48beec 39%, #3bb8e8 39%, #37b3e6 39%, #39b6e6 39%, #34b6e7 40%, #34b8e8 42%, #31bae4 43%, #31bce7 44%, #2ebbe6 45%, #29c4e3 53%, #25c4e2 55%, #26c7e3 56%, #23c7e2 56%, #22c8e2 58%, #24c8e4 58%, #22c7e3 59%, #20cae4 59%, #1dcbe3 63%, #1dcee2 63%, #1bcee4 66%, #19cee1 66%, #15d3e3 71%, #12d6e2 77%, #10d9e3 78%, #11d7e2 78%, #0cdce0 85%, #09dde0 86%, #09dde0 100%, #1be0e6 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(45deg,  #869af3 0%,#7d91f0 0%,#7a91ef 1%,#7c93f1 1%,#779aee 5%,#7498ec 6%,#749aef 6%,#739bf0 8%,#719bed 8%,#709fef 10%,#6e9feb 11%,#69a5ee 15%,#62a9eb 19%,#61aaee 21%,#60aaeb 21%,#5eaeed 25%,#58b1eb 27%,#56b5ed 31%,#55b4ea 31%,#54b5ea 32%,#50b9e9 34%,#50baec 34%,#4fb9e9 35%,#4cbcea 38%,#4cbce4 39%,#4dbee8 39%,#48beec 39%,#3bb8e8 39%,#37b3e6 39%,#39b6e6 39%,#34b6e7 40%,#34b8e8 42%,#31bae4 43%,#31bce7 44%,#2ebbe6 45%,#29c4e3 53%,#25c4e2 55%,#26c7e3 56%,#23c7e2 56%,#22c8e2 58%,#24c8e4 58%,#22c7e3 59%,#20cae4 59%,#1dcbe3 63%,#1dcee2 63%,#1bcee4 66%,#19cee1 66%,#15d3e3 71%,#12d6e2 77%,#10d9e3 78%,#11d7e2 78%,#0cdce0 85%,#09dde0 86%,#09dde0 100%,#1be0e6 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(45deg,  #869af3 0%,#7d91f0 0%,#7a91ef 1%,#7c93f1 1%,#779aee 5%,#7498ec 6%,#749aef 6%,#739bf0 8%,#719bed 8%,#709fef 10%,#6e9feb 11%,#69a5ee 15%,#62a9eb 19%,#61aaee 21%,#60aaeb 21%,#5eaeed 25%,#58b1eb 27%,#56b5ed 31%,#55b4ea 31%,#54b5ea 32%,#50b9e9 34%,#50baec 34%,#4fb9e9 35%,#4cbcea 38%,#4cbce4 39%,#4dbee8 39%,#48beec 39%,#3bb8e8 39%,#37b3e6 39%,#39b6e6 39%,#34b6e7 40%,#34b8e8 42%,#31bae4 43%,#31bce7 44%,#2ebbe6 45%,#29c4e3 53%,#25c4e2 55%,#26c7e3 56%,#23c7e2 56%,#22c8e2 58%,#24c8e4 58%,#22c7e3 59%,#20cae4 59%,#1dcbe3 63%,#1dcee2 63%,#1bcee4 66%,#19cee1 66%,#15d3e3 71%,#12d6e2 77%,#10d9e3 78%,#11d7e2 78%,#0cdce0 85%,#09dde0 86%,#09dde0 100%,#1be0e6 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#869af3', endColorstr='#1be0e6',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

}
</style>
