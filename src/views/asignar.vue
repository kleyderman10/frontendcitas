<template>
    <div class="container">
        <img src="../assets/LOGO.jpg" id="icon" alt="User Icon">
        <h1>Agenda de Citas disponibles por especialidad </h1>
        <template>
                <b-input-group>
                <b-form-input 
                v-b-popover.hover.top="'Buscador en el cual puede filtrar la informacion!'" title="Burcar cita"
                v-model="filte"
                type="search"
                id="filteInput"
                placeholder="Buscar Fecha disponible">
                </b-form-input>
                <b-input-group-append>
                    <b-button :disabled="!filte" @click="filte=''">Clear</b-button>
                </b-input-group-append>
                </b-input-group>        
                <b-table id="agesp"
                responsive striped hover 
                :items="agenda" 
                :fields="field"
                :filter="filte" 
                :filter-included-fields="filteOn" 
                :per-page="Perpage"
                :current-page="Page"
                :busy="isBusy"
                >
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
                 <template v-slot:cell(Acciones)='row'>
                    <button class="btn btn-secondary my-2" @click="asignar(row.item.CONSECUTIVO)">Asignar</button>
                 </template>
                </b-table>
                <b-pagination
                v-model="Page"
                :total-rows="filas"
                :per-page="Perpage"
                aria-controls="agesp"
                align="right"
                first-text="Prim."
                prev-text="Prev."
                next-text="Sig."
                last-text="Ult."
                ></b-pagination>
        </template> 
        <b-modal id="modal"
        ref="modal"
        size="lg"
        no-close-on-backdrop
        @ok="ok()">
            <form action="">
                <v-select v-model="tipo" @input="setSelected" class="style-chooser" :options="tipoc" placeholder="Tipo de Cita"></v-select>
                <v-select v-model="servicio" class="style-chooser" :options="servicios" :reduce="servicios=>servicios.IDSERVICIO"  label="DESCSERVICIO" placeholder="Tipo de Atencion"></v-select>
                <input v-model="numaut" type="text" placeholder="Numero de autorizacion" class="form-control">
            </form>
        </b-modal>
    <button class="btn btn-secondary my-2" @click="cancelar()" >Cancelar</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isBusy: false,
            agenda:[],
            Pages:[],
            Page:1,
            Perpage:3,
            id:'',
            idaf:'',
            servicio:'',
            servicios:[],
            cons:'',
            tipo:'',
            filte:'',
            numaut:'',
            afiliado:{idafiliado:'',idme:'',idplan:'',idtercero:'',sexo:'',idservicio:'',tipo:'',consecutivo:'',numaut:''},
            filteOn:[],
            field:[{key:'Fecha',sortable:true},
            {key:'Hora',sortable:true},
            {key:"Acciones"} ],
            tipoc:[{code:'Cita',label:'Cita'},
            {code:'Proc',	label:'Procedimiento'},
            {code:'Prio',	label:'Prioritaria'},
            {code:'Remi',	label:'Remision'},
            {code:'PQ',	label:'PostQuirurgico'}
            ]
        }
    },
    created(){
        this.veragenda();
    },
    methods:{
        veragenda(){
            this.isBusy = !this.isBusy
            this.id=localStorage.getItem("idmedico");
            this.axios.get(`/citas/${this.id}`,{ headers:{'access-token':localStorage.getItem("access-token")}})
            .then(res=>{
                this.agenda=res.data;
                //this.nombre=nomb;
                this.isBusy=false;
                
            })
            .catch(e=>{
                console.log(e.response);
            })
        },
        setSelected(){
            this.afiliado.idme=localStorage.getItem("idmedico");
            this.afiliado.idplan=localStorage.getItem("idplan");
            this.afiliado.idtercero=localStorage.getItem("idtercero");
            this.afiliado.sexo=localStorage.getItem("sexo");
            if(this.tipo!=null){
                    this.axios.get(`/servicios/${this.afiliado.idplan}/${this.afiliado.idme}/${this.afiliado.idtercero}/${this.afiliado.sexo}/${this.tipo.code}`,{ headers:{'access-token':localStorage.getItem("access-token")}})
                    .then(res=>{
                    this.servicios=res.data
                    })
                    .catch(e=>{
                    console.log(e.response);
                    }) 
            }else{
                this.servicios=[];
            }         
        },
        asignar(consecutivo){
            this.cons=consecutivo;
            this.afiliado.consecutivo=this.cons;         
            this.$root.$emit('bv::show::modal','modal','#btnasig');
        },
        ok(){
            this.afiliado.idafiliado=localStorage.getItem("idafiliado");
            this.afiliado.tipo=this.tipo.code;
            this.afiliado.idservicio=this.servicio;
            this.afiliado.numaut=this.numaut;

            this.axios.defaults.headers.common['access-token'] = localStorage.getItem("access-token");
            this.axios.put(`/citas/${this.afiliado.consecutivo}`,this.afiliado)
            .then(res=>{
                console.log(res.data);
                //this.$router.push('/especialidades');
            })
            .catch(e=>{console.log(e.response)})
            this.$router.push('/especialidades');
        },
        cancelar(){
            this.$router.push('/especialidades');
        }
    },
    computed:{
        filas() {
        return this.agenda.length
      }
    }
  
}
</script>
<style>
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
  width: 86%;
  
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  input[type=text]{
      text-align: left;
    padding: 15px 32px;
    padding-top: 15px;
    padding-right: 32px;
    padding-bottom: 15px;
    padding-left: 4px
  }
</style>