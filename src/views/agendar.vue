<template>
     <b-container fluid="sm">
        <img src="../assets/LOGO.jpg" id="icon" alt="User Icon">
        <h1>Agendar de Citas</h1>
        <b-form>
         <b-card border-variant="secondary" class="text-center" header="Agendar Citas">
            <b-card-body>
                <div class="row"> 
                    <div class="col-md-8">
                    <v-select v-model="fecha" class="style-chooser" :options="agenda" :reduce="agenda=>agenda.CONSECUTIVO"  label="FECHA" placeholder="Fecha Cita"></v-select>
                        <v-select v-model="tipo" @input="setSelected" class="style-chooser" :options="tipoc" placeholder="Tipo de Cita"></v-select>
                        <v-select v-model="servicio" class="style-chooser" :options="servicios" :reduce="servicios=>servicios.IDSERVICIO"  label="DESCSERVICIO" placeholder="Tipo de Atencion"></v-select>
                        <input v-model="numaut" type="text" placeholder="Numero de autorizacion" class="form-control">
                    </div>
                </div>
            </b-card-body>
         </b-card>
        </b-form>
        <button class="btn btn-secondary my-2" @click="cancelar()" >Cancelar</button>
    </b-container>
</template>
<script>
export default {
    data(){
        return{
            id:localStorage.getItem("idmedico"),
            idaf:'',
            agenda:[],
             tipoc:[{code:'Cita',label:'Cita'},
            {code:'Proc',	label:'Procedimiento'},
            {code:'Prio',	label:'Prioritaria'},
            {code:'Remi',	label:'Remision'},
            {code:'PQ',	label:'PostQuirurgico'}
            ],
            fecha:'',
            servicio:'',
            servicios:[],
            cons:'',
            tipo:'',
            filte:'',
            numaut:'',
            afiliado:{idafiliado:'',idme:'',idplan:'',idtercero:'',sexo:'',idservicio:'',tipo:'',consecutivo:'',numaut:''},
        }
    },
    created(){
        this.veragenda();
    },
    methods:{
        veragenda(){
            this.axios.get(`/citas/${this.id}`)
            .then(res=>{
                this.agenda=res.data;
                //this.nombre=nomb;
                
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
                    this.axios.get(`/servicios/${this.afiliado.idplan}/${this.afiliado.idme}/${this.afiliado.idtercero}/${this.afiliado.sexo}/${this.tipo.code}`,this.afiliado)
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
    }
    
}
</script>
<style>
input[type=text]{
    text-align: left;
    padding: 15px 32px;
    padding-top: 15px;
    padding-right: 32px;
    padding-bottom: 15px;
    width: 100% !important; 
    padding-left: 4px;
    margin-left: 0px;
  }
</style>