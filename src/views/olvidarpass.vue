<template>
<div class="container">
	<div class="row justify-content-center">
        <div class="col-md-8 col-md-offset-3">
            <div id="form-olvidado">
                <h4 class="">
                ¿Olvidaste tu contraseña?
                </h4>
            <form  @submit.prevent="enviar()">
                <fieldset>
                    <span class="help-block">
                    Le enviaremos un correo electrónico con una nueva contraseña.
                    </span>
                    <b-col sm="30">
                    <b-input-group size="lg" prepend="cc">
                        <b-form-input v-model="documento" class="form-control mt-0 mx-0"  placeholder="Documento" name="documento" type="text" ></b-form-input>
                    </b-input-group>
                    </b-col>
                    <b-form-group
                    label-for="input-1"
                    :invalid-feedback="valemail"
                    :valid-feedback="validam"
                    :state="State"
                    >
                    <b-input-group size="lg" class="mt-2" prepend="@">
                        <b-form-input id="input-1" v-model="correor" :state="State"  class="form-control" placeholder="Email" name="email" type="email" required=""></b-form-input>
                    </b-input-group>
                    </b-form-group>
                    <div>
                        <button :disabled="habilitado"  type="submit" class="btn btn-secondary btn-block mt-2" id="btn-olvidado">
                        Enviar
                        </button>
                    </div>
                    <p class="help-block">
                    <a class="text-muted" href="/" id="acceso"><small>Inicio de Sesion</small></a>
                    </p>
                </fieldset>
            </form>
            </div>
        </div>
	</div>
</div>
</template>
<script>

  export default {
    computed: {
      State() {
        return this.correor===this.correop & this.correor.length>2 ? true : false
      },
      isDisabled(){
          if(this.correor===this.correop){
              return this.habilitado=true;
          }else{
              return this.habilitado=false;
          }
        },
      valemail(){
          if (this.documento.length>5){
              this.validar();
          }
          if(this.correor===this.correop){
          }else{
              this.habilitado=true
              return 'El correo no concuerda con el vinculado a el usuario'
          }
          if(this.correop===''){
              this.habilitado=true
              return 'El ususario no cuenta con un correo viculado'
          }
          
      },
      validam(){
          if(this.correor===this.correop){
              this.habilitado=false
              return 'Correo valido'
          }
      }
    },
    data() {
      return {
        documento:'',
        correor: '',
        correop:'',
        msbody:{toEmail:'',html:'',text:''},
        habilitado:false,
        clave:''
      }
    },
    methods:{
        validar(){
            this.axios.get(`/afiliado/${this.documento}`)
            .then(res=>{
                this.correop=res.data[0].EMAIL;
            })
        },
        enviar(){
            this.msbody.toEmail=this.correor        
            this.axios.post('/correo/send/',this.msbody)
            .then(res=>{
                alert(res.data.message);
                this.$router.push('/');
            })
            this.clave='';
        }
    }
  }
</script>
<style>
#input-1{
    text-transform: lowercase !important;
}
</style>