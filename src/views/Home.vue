<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
          <!-- Tabs Titles -->
          <!-- Icon -->
          <div class="fadeIn first">
            <img src="../assets/LOGO.jpg" id="icon" alt="User Icon">
            <h1>Citas Medicas</h1>
          </div>

          <!-- Login Form -->
          <form class="container" @submit.prevent="validar()">
            <div class="wrapper fadeInDown">
            <div class="row">
              <div class="col-md-14">
                <b-alert
                :show="dismisscountdown"
                dismissible
                :variant="mensaje.color"
                @dismissed="dismisscountdown=0"
                @dismiss-count-down="countDownChanged"
                >
                <p>{{mensaje.texto}}</p>
                </b-alert>
                <b-form-input style="text-align:left;" align='left'  v-model="id" type="text" name="id" placeholder="Documento" class="form-control"></b-form-input>
                <b-form-input style="text-align:left;" align='left'  v-if="reg===true" v-model="password" type="password" name="password" placeholder="Password" class="form-control"></b-form-input>
              <!--<router-link to="/about">-->
                <button v-if="regis===0"  class="btn btn-secondary my-2" >Ingresar</button>
                <button v-if="regis===1"  class="btn btn-secondary my-2" >Registrarse</button>
              <!--</router-link>-->
              </div>
              <router-link to="/olvidarpass">Olvidaste tu contraseña</router-link>
            </div>
            </div>
          </form>

          <!-- Remind Passowrd -->
          <div id="formFooter">
            <a id="lhome" class="underlineHover" href="https://clinicabuenosaires.com.co/">Ir al sitio web</a>
          </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data(){
    return{
      dismisscountdown:0,
      dismissSecs:3,
      showDismissibleAlert:false,
      mensaje:{color:'success',texto:''},
      cc:null,
      id:'',
      nombre:'',
      reg:false,
      regis:0,
      password:'',
      options:[ 
                {code:'AS',	label:'Adulto sin identificar'},
                {code:'CC',	label:'Cédula de Ciudadanía'},
                {code:'CE',	label:'Cédula de Extranjería'},
                {code:'MS',	label:'Menor sin identificar'},
                {code:'NIT',label:'NIT'},
                {code:'NV',	label:'Nacido vivo'},
                {code:'PE',	label:'Permiso Especial De Permanencia'},
                {code:'PS',	label:'Pasaporte'},
                {code:'RC',	label:'Registro Civil'},
                {code:'TI',	label:'Tarjeta de Identidad'}]
    } 
  },methods:{
    validar(){
      this.axios.get(`/login/${this.id}`)
      .then(res=>{
          if(!res.data[0].IDAFILIADO){
            console.log("no se esta registrado");
          }else{
            if (this.reg===false){
              this.reg=true;
            }else{
                if (this.password===res.data[0].CLAVE){
                   this.axios.get(`/login/autenticar/${this.id}`)
                  .then(res=>{
                    
                    this.$router.push('/especialidades');
                    localStorage.setItem('access-token',res.data.token)
                    localStorage.setItem('idafiliado',this.id);
                    console.log(res.data.token);})
                }else{
                  this.mensaje.color="danger";
                  this.mensaje.texto='Usuario o clave invalido';
                  this.showAlert();
                }    
            }
          }
      })
      .catch(e=>{
        console.log(e.response);
        if (this.regis===0){
        this.mensaje.color="danger";
        this.mensaje.texto='Usuario no registrado en nuestra base de datos';
        this.showAlert();
        this.regis=1;
        }else{
          this.registrar();
        }
      })
    },
    registrar(){
      this.$router.push('/registrarse');
    },
    countDownChanged(dismisscountdown){
      this.dismisscountdown=dismisscountdown
    },
    showAlert(){
      this.dismisscountdown=this.dismissSecs
    }
  }
}
</script>
