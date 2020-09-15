<template>
    <div class="container">
        <b-card no-body>
        <b-tabs v-model=" tabIndex" card small>
            
            <b-tab title="Citas Disponible" @click="listaesp()">
                
                        <img src="../assets/LOGO.jpg" id="icon" alt="User Icon">
                        <h4 class="mt-2">Citas disponibles por especialidad</h4>
                <p class="mt-2" align="left">Usuario: {{idafiliado}} {{nombrepaciente}}</p>
                    <b-input-group>
                    <b-form-input
                        v-b-popover.hover.top="'Buscador en el cual puede filtrar la informacion presentada!'" title="Burcar especialidad" 
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Buscar especialista">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter=''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>   
                    <b-table id="tesp"
                        responsive striped hover 
                        :items="especialidads" 
                        :fields="fields"
                        :filter="filter" 
                        :filter-included-fields="filterOn" 
                        :per-page="perpag"
                        :current-page="currentPage"
                        :busy="isBusy">
                        <template v-slot:table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                        <template v-slot:cell(Acciones)='row'>
                            <button size="sm"  placement="rightbottom" class="btn btn-secondary mr-2" 
                            id="btnver" @click="ver(row.item.IDMEDICO)">Ver Agenda</button>
                        </template>
                    </b-table>
                    <b-pagination  pills
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perpag"
                        aria-controls="tesp" align="right"
                        first-text="Prim."
                        prev-text="Prev."
                        next-text="Sig."
                        last-text="Ult."
                    ></b-pagination>
            </b-tab>
            <b-tab small title="Historico de Citas" @click="listahistorico()">
                <img src="../assets/LOGO.jpg" height="60" id="icon" alt="User Icon">
                <h4>Historico de Citas</h4>
                <p align="left">Usuario: {{idafiliado}} {{nombrepaciente}}</p>
                <form @submit.prevent="cancita()">
                    <b-input-group>
                    <b-form-input
                        v-b-popover.hover.top="'Buscador en el cual puede filtrar la informacion presentada!'" title="Burcar especialidad" 
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Buscar especialista">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter=''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>   
                    <b-table id="thist"
                        striped hover responsive="sm" 
                        :items="historico" 
                        :fields="field"
                        :filter="filter" 
                        :filter-included-fields="filterOn" 
                        :per-page="perpag"
                        :current-page="currentPage">
                        <template v-slot:cell(Acciones)='row'>
                            <button type="submit" v-if="row.item.CUMPLIDA===0" size="sm" placement="rightbottom" class="btn btn-secondary mr-2" 
                            id="btnver" @click="select(row.item.CONSECUTIVO)">Cancelar Cita</button>
                        </template>
                    </b-table>
                    <b-pagination  pills
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perpag"
                        aria-controls="thist" align="right"
                        first-text="Prim."
                        prev-text="Prev."
                        next-text="Sig."
                        last-text="Ult."
                    ></b-pagination>
                </form>
            </b-tab>
            
            <b-tab small title="Actualizar Datos" @click="oncargar">
             <b-overlay :show="show" rounded="sm">
                <template>
                    <b-container fluid="sm">
                        <b-form @submit.prevent="onSubmit">
                          <b-card border-variant="secondary">
                            <div class="row">
                                <div class="col-md-6">
                                    <b-form-input readonly size="sm" style="text-align:left;" align='left' required  v-model="id" type="text" name="id" placeholder="Documento" class="form-control"></b-form-input>
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
                                    <v-select class="mx-4" v-model="cc" :options="optipo" :reduce="optipo=>optipo.code" placeholder="Tipo Documento">
                                        <template #search="{attributes, events}">
                                        <input
                                        class="vs__search"
                                        :required="!cc"
                                        v-bind="attributes"
                                        v-on="events"
                                        />
                                    </template>
                                    </v-select>
                                    <v-select  class="mt-2 mx-4" v-model="sexo" :options="opsexo" :reduce="opsexo=>opsexo.code" placeholder="Sexo">
                                        <template #search="{attributes, events}">
                                        <input
                                        class="vs__search"
                                        :required="!sexo"
                                        v-bind="attributes"
                                        v-on="events"
                                        />
                                    </template>
                                    </v-select>
                                    <v-select  class="mt-2 mx-4" v-model="grup_san"  :options="opgrupsan" :reduce="opgrupsan=>opgrupsan.code" placeholder="Grupo Sanguineo">
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
                                    <v-select  class="mt-2 mx-4" v-model="nivel" :value="nivel" :options="nivelopt" :reduce="nivelopt=>nivelopt.code" placeholder="NINEL SOCIO-ECONOMICO">
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
                                <div class="col-md-4">
                                    <b-form-checkbox v-model="mdpass" switch size="sm">Modificar Password</b-form-checkbox>
                                </div>
                            </div>
                            <div v-if="mdpass" class="row">
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
                                <button class="btn btn-secondary my-2">Actulizar</button>
                                <button class="btn btn-secondary my-2 mx-2" @click="cancelar">Cancelar</button>
                        </b-form>
                    </b-container>
                </template>
            </b-overlay>
             </b-tab>
             <b-tab small disabled></b-tab><b-tab disabled small></b-tab><b-tab disabled small></b-tab>
             <b-tab small disabled></b-tab><b-tab disabled small></b-tab><b-tab disabled small></b-tab>
             <b-tab small disabled></b-tab><b-tab disabled small></b-tab>
             <b-tab small disabled></b-tab><b-tab disabled small></b-tab>
             <b-tab small disabled></b-tab><b-tab disabled small></b-tab>
             <b-tab align="right" class="ml-6" small title="Cerrar sesion" @click="cancelar()">
             </b-tab>
        </b-tabs>
        </b-card>
    </div>
</template>
<script>
import moment from "moment";
export default{ 
    data(){
        return{
            tabIndex: 0,
            show: false,
            isBusy: false,
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
            mdpass:false,
            terceros:[],
            planes:[],
            ciudades:[],
            nivelopt:[{code:'1',	label:'NIVEL 1'},
                {code:'2',	label:'NIVEL 2'},
                {code:'3',	label:'NIVEL 3'},
                {code:'4',	label:'NIVEL 4'},
                {code:'5',	label:'NIVEL 5'},
                {code:'6',	label:'NIVEL 6'}],
            optipo:[ 
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
            confirma:'',nivel:''},
            especialidads:[],
            historico:[],
            titulo:'',
            especialidad:{id:'',nombre:'',especialidad:'',citasdisponibles:''},
            currentPage:1,
            perpag:3,
            filter:'',
            filterOn:[],
            idafiliado:'',
            idaf:'',
            nombrepaciente:'',
            idme:'',
            nombre:'',
            index:'',
            cons:'',
            afiliado:{idme:'',idplan:'',idtercero:''},
            options:[{value:null,	text:'Tipo Cita', disabled:true},
                     {value:"pv",	text:'Primera Vez'},{value:"ct",	text:'Control'}],
            tipo:null,
            fields:[
                {key:"Nombre",
                sortable:true},
                {key:"Especialidad",
                sortable:true},
                {key:"CitasDisponibles",
                sortable:true},
                {key:"Acciones"}
            ],
            field:[{key:"Fecha",
                sortable:true},
                {key:"Hora",
                sortable:true},
                 {key:"Nombre",
                sortable:true},
                 {key:"Especialidad",
                sortable:true},
                {key:"Acciones"}],
            tabsel:0,
            carga:0
        }
    },
    created(){
        this.listaesp();
    },
    methods:{
       async listaesp(){
            
            this.isBusy = !this.isBusy
            this.axios.get('/citas',{ headers:{'access-token':localStorage.getItem("access-token")}})
            .then(res=>{
                this.especialidads=res.data;
                this.idaf=localStorage.getItem("idafiliado");
                this.traerafi(this.idaf);
                this.isBusy=false;
            })
            .catch(e=>{
                console.log(e.response);
            })
        },
       async listahistorico(){
           this.idaf=localStorage.getItem("idafiliado");
           this.axios.get(`/citas/historico/${this.idaf}`,{ headers:{'access-token':localStorage.getItem("access-token")}})
            .then(res=>{
                this.historico=res.data;
                this.traerafi(this.idaf);
            })
            .catch(e=>{
                console.log(e.response);
            }) 
        }
        ,
       async traerafi(id){
            this.axios.get(`/afiliado/${id}`,{ headers:{'access-token':localStorage.getItem("access-token")}})
            .then(res=>{
                this.idafiliado=res.data[0].IDAFILIADO;
                this.nombrepaciente=res.data[0].NOMBREAFI;
                this.afiliado.idplan=res.data[0].IDPLAN;
                this.afiliado.idtercero=res.data[0].IDADMINISTRADORA;
                localStorage.setItem("idplan",this.afiliado.idplan);
                localStorage.setItem("idtercero",this.afiliado.idtercero);
                localStorage.setItem("sexo",res.data[0].SEXO);
                this.nombrep=res.data[0].PNOMBRE;
                this.nombrese=res.data[0].SNOMBRE;
                this.apellidop=res.data[0].PAPELLIDO;
                this.apellidose=res.data[0].SAPELLIDO;
                this.dirreccion=res.data[0].DIRECCION;
                this.telefono=res.data[0].TELEFONORES;
                this.email=res.data[0].EMAIL;
                this.fecha=res.data[0].FNACIMIENTO;
                this.cc=res.data[0].TIPO_DOC;
                this.sexo=res.data[0].SEXO;
                this.grup_san=res.data[0].GRUPO_SANG;
                this.ciudad=res.data[0].CIUDAD;
                this.eps=res.data[0].IDADMINISTRADORA;
                this.nivel=res.data[0].NIVELSOCIOEC;
                this.plan=res.data[0].IDPLAN;
                this.password=res.data[0].CLAVE;
                this.confirma=res.data[0].CLAVE;
                this.id=res.data[0].IDAFILIADO;
            })
            .catch(e=>{
                console.log(e.response);
            })
        },
        ver(id){
            localStorage.setItem('idmedico',id)
            this.$router.push('/asignar');
        },
        ok2(){
            this.veragenda(this.idme);
        },cancel(){
            this.veragenda(this.idme);
        },
        cancelar(){
            localStorage.removeItem("idplan");
            localStorage.removeItem("idtercero");
            localStorage.removeItem("sexo");
            localStorage.removeItem('idmedico');
            localStorage.removeItem('idafiliado');
            this.$router.push('/');
        },
        select(id){
           this.cons=id;
        },
      async cancita(){ 
           var msg=confirm("Desea Cancelar esta cita");
           if (msg===true){
           this.axios.delete(`/ccitas/${this.cons}`)
            .catch(e=>{ 
                console.log(e.response);
            }) 
            this.index=this.historico.findIndex(item=>item.CONSECUTIVO===this.cons);
            this.historico.splice(this.index,1);
            this.tabIndex =1;
           }else{
            this.listahistorico();
            }
        }, 
       async onSubmit(){
            this.afiliado.cc=this.cc;
            this.afiliado.id=this.id;
            this.afiliado.nombrese=this.nombrese;
            this.afiliado.nombrep=this.nombrep;
            this.afiliado.apellidose=this.apellidose;
            this.afiliado.apellidop=this.apellidop;
            this.afiliado.fecha=this.fecha;
            this.afiliado.sexo=this.sexo;
            this.afiliado.grup_san=this.grup_san;
            this.afiliado.dirreccion=this.dirreccion;
            this.afiliado.telefono=this.telefono;
            this.afiliado.email=this.email;
            this.afiliado.ciudad=this.ciudad;
            this.afiliado.eps=this.eps;
            this.afiliado.plan=this.plan;
            this.afiliado.password=this.password;
            this.afiliado.nivel=this.nivel;
            this.axios.put(`/afiliado/editar/${this.id}`,{ headers:{'access-token':localStorage.getItem("access-token")}},this.afiliado)
            .then(res=>{
                console.log(res.data);
                this.tabIndex=0;
            })
            .catch(e=>{console.log(e.response)})
            
        },
        onSearch(search, loading){
            loading(true);
            this.carga=1;
            this.search(loading,search,this);
        },
       async search(loading, search,vm){
            if (escape(search).length>0){
                 this.axios.get(`/contratos/terceros/${escape(search)}`)
                .then(res=>{
                //this.show=false;
                    this.terceros=res.data;
                })
                .catch(e=>{console.log(e.response)})
            }
            if (this.carga===1){
             loading(false);
            }
        },
       async onplanes(eps){
          this.axios.get(`/contratos/planes/${eps}`)
          .then(res=>{
              this.planes=res.data;
          })
          .catch(e=>{console.log(e.response)})
        },
        onSearchC(search, loading){
            this.carga=1;
            loading(true);
            this.onciudades(loading,search,this);
        },
        async onciudades(loading, search,vm){
            if (escape(search).length>0){
             this.axios.get(`/ciudades/${escape(search)}`)
            .then(res=>{
                this.ciudades=res.data;
            })
            .catch(e=>{console.log(e.response)})
            }
            if (this.carga===1){
             loading(false);
            }
            
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
        afcancelar(){
            this.$router.push('/');
        },
       async oncargar(){
            this.carga=0;
             this.onciudades(false,this.ciudad,this);
             this.onplanes(this.eps);
        }   
    },
    computed:{
        displayag(){
            return this.paginate(this.agenda);
        },
        rows() {
        return this.especialidads.length
      },
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
      
    },
    watch:{
        agenda(){
            this.setAgenda();
        }
    }
}
</script>
<style>
h4{
    color:#6b6b6b;
    text-align: left;
}
p{
    color:#6b6b6b;
    font-size: 14px;
}
mg {
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