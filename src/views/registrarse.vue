<template>
     <b-container fluid="sm">
         <b-form @submit.prevent="onSubmit">
            <b-card
            border-variant="secondary" 
            class="text-center">
            <b-card class="my-1" border-variant="secondary">
                <h3>Registro de usuarios</h3>
                <img src="../assets/LOGO.jpg" width="170" height="50"  alt="User Icon">
            </b-card>
            <b-card border-variant="secondary">
               <div class="row">
                <div class="col-md-6">
                    <b-form-input size="sm" style="text-align:left;" align='left' required  v-model="id" type="text" name="id" placeholder="Documento" class="form-control"></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="nombrep" type="text" name="nombrep" placeholder="Primer nombre" class="form-control"></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="nombrese" type="text" name="nombrese" placeholder="Segundo nombre" class="form-control"></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="apellidop" type="text" name="apellidop" placeholder="Primer apellido" class="form-control" ></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="apellidose" type="text" name="apellidose" placeholder="Segundo apellido" class="form-control"></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="dirreccion" type="text" name="dirreccion" placeholder="Direccion recidencia" class="form-control"></b-form-input>
                    <b-form-input size="sm" style="text-align:left;" align='left' required v-model="telefono" type="text" name="telefono" placeholder="Telefono o Celular" class="form-control"></b-form-input>
                    <b-form-input required id="inpemail" size="sm" style="text-align:left;" align='left'  v-model="email" type="text" name="email" placeholder="Email" class="form-control"></b-form-input>
                </div>
                <div class="col-md-6">
                    <b-form-group
                    :invalid-feedback="invalidFeedback"
                    :state="state"
                    >
                    <!-- <b-input-group id="dtg" prepend="F. NACIMIENTO" size="sm"> -->
                    <b-form-input required id="inputfecha" :state="state" size="sm" style="text-align:left;" align='left'  v-model="fecha" placeholder="FECHA DE NACIMIENTO" type="date" name="telefono" class="form-control"></b-form-input>
                    <!--<datetime v-if="fecha.length>0" v-model="fnacimiento" id="dt" input-style=""  type="date" format="dd/MM/yyyy" title="Fecha de nacimiento" auto input-class="form-control" placeholder="FECHA DE NACIMIENTO"></datetime>-->
                    <!-- </b-input-group> -->
                    </b-form-group>
                    <v-select class="mx-4" v-model="cc" :options="options" placeholder="Tipo Documento">
                        <template #search="{attributes, events}">
                        <input
                        class="vs__search"
                        :required="!cc"
                        v-bind="attributes"
                        v-on="events"
                        />
                    </template>
                    </v-select>
                    <v-select  class="mt-2 mx-4" v-model="sexo" :options="opsexo" placeholder="Sexo">
                        <template #search="{attributes, events}">
                        <input
                        class="vs__search"
                        :required="!sexo"
                        v-bind="attributes"
                        v-on="events"
                        />
                    </template>
                    </v-select>
                    <v-select  class="mt-2 mx-4" v-model="grup_san" :options="opgrupsan" placeholder="Grupo Sanguineo">
                        <template #search="{attributes, events}">
                        <input
                        class="vs__search"
                        :required="!grup_san"
                        v-bind="attributes"
                        v-on="events"
                        />
                    </template>
                    </v-select>
                    <v-select  class="mt-2 mx-4" :filterable="false" v-model="ciudad"  :options="ciudades" 
                                    :reduce="ciudades=>ciudades.CIUDAD"  
                                    label="NOMBRE" placeholder="CIUDAD DE RECIDENCIA"
                                    @search="onSearchC">
                                        <template slot="no-options">
                                            Buscar ciudad de residencia..
                                        </template>
                                        <template slot="option" slot-scope="option">
                                            <div class="d-center">
                                                {{ option.NOMBRE}}
                                            </div>
                                        </template>
                                        <template slot="selected-option" slot-scope="option">
                                            <div class="selected d-center">
                                                {{ option.NOMBRE }}
                                            </div>
                                        </template>
                                    </v-select>
                                    <v-select  class="mt-2 mx-4" :filterable="false" v-model="eps" :reduce="terceros=>terceros.IDTERCERO"  :options="terceros"  label="RAZONSOCIAL" 
                                        @search="onSearch" @input="onplanes" placeholder="EPS O ENTIDAD PRESTADORA">
                                        <template slot="no-options">
                                            Buscar eps a al que pertenece..
                                        </template>
                                        <template slot="option" slot-scope="option">
                                            <div class="d-center">
                                                {{ option.RAZONSOCIAL}}
                                            </div>
                                        </template>
                                        <template slot="selected-option" slot-scope="option">
                                            <div class="selected d-center">
                                                {{ option.RAZONSOCIAL }}
                                            </div>
                                        </template>
                                    </v-select>
                                    <v-select  class="mt-2 mx-4" v-model="plan" :options="planes" :reduce="planes=>planes.IDPLAN"  label="DESCPLAN" placeholder="PLAN DE BENEFICIOS">
                                        <template #search="{attributes, events}">
                                        <input
                                        class="vs__search"
                                        :required="!plan"
                                        v-bind="attributes"
                                        v-on="events"
                                        />
                                    </template>
                                    </v-select>
                    <v-select  class="mt-2 mx-4" v-model="nivel" :options="nivelopt" placeholder="NINEL SOCIO-ECONOMICO">
                        <template #search="{attributes, events}">
                        <input
                        class="vs__search"
                        :required="!nivel"
                        v-bind="attributes"
                        v-on="events"
                        />
                    </template>
                    </v-select>
                </div>
            </div> 
             <div class="row">
                <div class="col-md-6">
                    <b-form-group
                    :invalid-feedback="valid"
                    :state="statep"
                    >
                        <b-form-input id="password" :state="statep" size="sm" style="text-align:left;" align='left' required  v-model="password" type="password" name="id" placeholder="PASSWORD" class="form-control mt-2"></b-form-input>
                    </b-form-group>
                </div>
                <div class="col-md-6">
                    <b-form-group
                    :invalid-feedback="validconf"
                    :state="statecp"
                    >
                     <b-form-input  :state="statecp" id="confirma" size="sm" style="text-align:left;" align='left' required  v-model="confirma" type="password" name="id" placeholder="CONFIRMAR PASSWORD" class="form-control mt-2"></b-form-input>
                    </b-form-group>
                </div>
             </div>
            </b-card>
                <button class="btn btn-secondary my-2">Guardar</button>
                <button class="btn btn-secondary my-2 mx-2" @click="cancelar">Cancelar</button>
            </b-card>
         </b-form>
     </b-container>
</template>
<script>
import moment from "moment";
export default {
    data(){
        return{
            cc:'',
            id:'',
            nombrese:'',
            nombrep:'',
            apellidose:'',
            apellidop:'',
            fnacimiento:'',
            sexo:'',
            grup_san:'',
            estaciv:'',
            dirreccion:'',
            telefono:'',
            email:'',
            ciudad:'',
            eps:'',
            plan:'',
            f:new Date(),
            password:'',
            confirma:'',
            doptions : { day: 'numeric',month: 'short', year: 'numeric'  },
            fecha:'',
            nivel:'',
            terceros:[],
            planes:[],
            ciudades:[],
            nivelopt:[{code:'1',	label:'NIVEL 1'},
                {code:'2',	label:'NIVEL 2'},
                {code:'3',	label:'NIVEL 3'},
                {code:'4',	label:'NIVEL 4'},
                {code:'5',	label:'NIVEL 5'},
                {code:'6',	label:'NIVEL 6'}],
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
                {code:'TI',	label:'Tarjeta de Identidad'}],
            opsexo:[
                {code:'Femenino',	label:'Femenino'},
                {code:'Masculino',	label:'Masculino'}
            ],
            opgrupsan:[{code:'A+',	label:'A Positivo'},
                {code:'A-',	label:'A Negativo'},
                {code:'AB+',	label:'AB+ Positivo'},
                {code:'AB-',	label:'AB+ Negativo'},
                {code:'B+',	label:'B+ Positivo'},
                {code:'B-',	label:'B- Negativo'},
                {code:'O+',	label:'O+ Positivo'},
                {code:'O-',	label:'O- Negativo'},
                {code:'NoSab',	label:'No Sabe'}],
            opestcivil:[
                {code:'Casado',	label:'Casado'},
                {code:'Separado',	label:'Separado'},
                {code:'Soltero',	label:'Soltero'},
                {code:'Union libre',	label:'Union libre'},
                {code:'Viudo',	label:'Viudo'}
            ],
            afiliado:{cc:'', id:'',
            nombrese:'',nombrep:'', apellidose:'',
            apellidop:'', fecha:'',sexo:'', grup_san:'',
            estaciv:'',dirreccion:'',
            telefono:'',email:'',ciudad:'',eps:'',plan:'',password:'',
            confirma:'',nivel:''}
        }
    },
    created(){
        //this.oncargar();
    },
    methods:{
        onSubmit(){
            this.afiliado.cc=this.cc.code;
            this.afiliado.id=this.id;
            this.afiliado.nombrese=this.nombrese;
            this.afiliado.nombrep=this.nombrep;
            this.afiliado.apellidose=this.apellidose;
            this.afiliado.apellidop=this.apellidop;
            this.afiliado.fecha=this.fecha;
            this.afiliado.sexo=this.sexo.code;
            this.afiliado.grup_san=this.grup_san.code;
            this.afiliado.dirreccion=this.dirreccion;
            this.afiliado.telefono=this.telefono;
            this.afiliado.email=this.email;
            this.afiliado.ciudad=this.ciudad;
            this.afiliado.eps=this.eps;
            this.afiliado.plan=this.plan;
            this.afiliado.password=this.password;
            this.afiliado.nivel=this.nivel.code;
            console.log(this.afiliado);
            this.axios.post("/afiliado/crear/",this.afiliado)
            .then(res=>{
                console.log(res.data);
                this.$router.push('/');
            })
            .catch(e=>{console.log(e.response)})
            
        },
        onSearch(search, loading){
            loading(true);
            this.search(loading,search,this);
        },
        search(loading, search,vm){
            if (escape(search).length>0){
                 this.axios.get(`/contratos/terceros/${escape(search)}`)
                .then(res=>{
                //this.show=false;
                    this.terceros=res.data;
                    loading(false);
                })
                .catch(e=>{
                    console.log(e.response); 
                    loading(false);}
                )  
            }
             loading(false);
        },
        onplanes(){
          this.axios.get(`/contratos/planes/${this.eps}`)
          .then(res=>{
              this.planes=res.data;
          })
          .catch(e=>{console.log(e.response)})
        },
      /*   oncargar(){ 
            if (this.ciudad===''){
               this.onciudades(); 
            }            
            
        }, */
        onSearchC(search, loading){
            loading(true);
            this.onciudades(loading,search,this);
        },
        onciudades(loading, search,vm){
            if (escape(search).length>0){
             this.axios.get(`/ciudades/${escape(search)}`)
            .then(res=>{
                this.ciudades=res.data;
                loading(false);
            })
            .catch(e=>{console.log(e.response); loading(false);})
            }
            loading(false);
        },
        validar_clave(contrasenna)
		{
			if(contrasenna.length >= 6)
			{		
				var mayuscula = false;
				var minuscula = false;
				var numero = false;
				var caracter_raro = false;
				
				for(var i = 0;i<contrasenna.length;i++)
				{
					if(contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90)
					{
                        mayuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122)
					{
                        minuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57)
					{
                        numero = true;
					}
					else
					{
                        caracter_raro = true;
					}
				}
				if(mayuscula == true && minuscula == true && caracter_raro == false && numero == true)
				{
					return true;
				}
			}
			return false;
        },
        cancelar(){
            this.$router.push('/');
        }
    },
    computed:{
        state() {
        return (this.fecha<moment(this.f, 'YYYY/MM/dd').format('YYYY-MM-DD')) & this.fecha.length>1 ? true : false
        },
        statep() {
        return this.validar_clave(this.password)===true & this.password.length>1 ? true : false
        },
        statecp() {
        return (this.password===this.confirma)& this.confirma.length>1 ? true : false
        },
        invalidFeedback() {
        if (this.fecha>moment(this.f, 'YYYY/MM/dd').format('YYYY-MM-DD')) {
           return 'la fecha no puede ser mayor a la actual'
        }else if (this.fecha===moment(this.f, 'YYYY/MM/dd').format('YYYY-MM-DD')) {
          return 'la fecha no puede ser igual a la actual'
        } 
        },
        valid() {
            if (this.password.length<8 & this.password.length>=6) {
                return 'el password debe tener de 6 a 8 caracteres'
            }else if(this.password.length<1){
                return 'El password debe contener al menos una mayuscula, una miniscula y un numero'
            }
            if (this.validar_clave(this.password)===false){
            return 'Contraseña no segura'
            }
        },
        validconf() {
            if (this.password.length>this.confirma.length) {
                return 'El numero de caracteres no concuerdan con el password'
            }else if(this.password!=this.confirma){
                return 'El password debe coincidir con la confirmacion'
            }else if(this.confirma.length<1){
                return 'Debe digitar la confirmacion'
            }
        }
    }
}
</script>
<style>
img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}
</style>