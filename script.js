const data = [
  { semestre: "Semestre 1", materias: [
    { nombre:"Química General para Medicina", codigo:"MED101", creditos:5 },
    { nombre:"Anatomía Clínica e Imagenológica I", codigo:"MED102", creditos:6 },
    { nombre:"Histología", codigo:"MED103", creditos:4 },
    { nombre:"Psicología Médica", codigo:"MED104", creditos:3 },
    { nombre:"Historia del Conocimiento Médico", codigo:"MED105", creditos:3 },
    { nombre:"Aprendizaje Estratégico y Liderazgo", codigo:"UNI101", creditos:3 },
    { nombre:"Comunicación Efectiva", codigo:"UNI102", creditos:3 }
  ]},

  { semestre: "Semestre 2", materias: [
    { nombre:"Biología Celular y Molecular I", codigo:"MED201", creditos:5 },
    { nombre:"Anatomía Clínica e Imagenológica II", codigo:"MED202", creditos:6 },
    { nombre:"Embriología", codigo:"MED203", creditos:4 },
    { nombre:"Neuroanatomía", codigo:"MED204", creditos:4 },
    { nombre:"Procedimientos Básicos I", codigo:"MED205", creditos:3 },
    { nombre:"Pensamiento Crítico Aplicado", codigo:"UNI201", creditos:3 },
    { nombre:"Interacción Social", codigo:"UNI202", creditos:3 }
  ]},

  { semestre: "Semestre 3", materias: [
    { nombre:"Biología Celular y Molecular II", codigo:"MED301", creditos:5 },
    { nombre:"Microbiología I", codigo:"MED302", creditos:4 },
    { nombre:"Fisiología Médica I", codigo:"MED303", creditos:6 },
    { nombre:"Patología I", codigo:"MED304", creditos:5 },
    { nombre:"Bioestadística", codigo:"MED305", creditos:3 },
    { nombre:"Lenguaje Cuantitativo", codigo:"UNI301", creditos:3 }
  ]},

  { semestre: "Semestre 4", materias: [
    { nombre:"Bioquímica Médica", codigo:"MED401", creditos:5 },
    { nombre:"Microbiología II", codigo:"MED402", creditos:4 },
    { nombre:"Fisiología Médica II", codigo:"MED403", creditos:6 },
    { nombre:"Patología II", codigo:"MED404", creditos:5 },
    { nombre:"Neurofisiología", codigo:"MED405", creditos:4 },
    { nombre:"Propedéutica Clínica I", codigo:"MED406", creditos:4 },
    { nombre:"Procedimientos Básicos II", codigo:"MED407", creditos:3 }
  ]},

  { semestre: "Semestre 5", materias: [
    { nombre:"Farmacología I", codigo:"MED501", creditos:5 },
    { nombre:"Nutrición", codigo:"MED502", creditos:3 },
    { nombre:"Genética", codigo:"MED503", creditos:4 },
    { nombre:"Diagnóstico por Imagen I", codigo:"MED504", creditos:3 },
    { nombre:"Psicopatología I", codigo:"MED505", creditos:4 },
    { nombre:"Propedéutica Clínica II", codigo:"MED506", creditos:4 },
    { nombre:"Promoción de la Salud", codigo:"MED507", creditos:3 },
    { nombre:"Bioética y Legislación Médica", codigo:"MED508", creditos:3 }
  ]},

  { semestre: "Semestre 6", materias: [
    { nombre:"Farmacología II", codigo:"MED601", creditos:5 },
    { nombre:"Diagnóstico por Imagen II", codigo:"MED602", creditos:3 },
    { nombre:"Psicopatología II", codigo:"MED603", creditos:4 },
    { nombre:"Propedéutica Sistema Nervioso", codigo:"MED604", creditos:4 },
    { nombre:"Propedéutica Clínica III", codigo:"MED605", creditos:4 },
    { nombre:"Procedimientos Básicos III", codigo:"MED606", creditos:3 },
    { nombre:"Salud Pública y Epidemiología", codigo:"MED607", creditos:4 }
  ]},

  { semestre: "Semestre 7", materias: [
    { nombre:"Neumología", codigo:"MED701", creditos:4 },
    { nombre:"Nefrología", codigo:"MED702", creditos:4 },
    { nombre:"Dermatología", codigo:"MED703", creditos:3 },
    { nombre:"Salud Mental I", codigo:"MED704", creditos:4 },
    { nombre:"Pediatría I", codigo:"MED705", creditos:5 },
    { nombre:"Neurología", codigo:"MED706", creditos:4 },
    { nombre:"Cardiología", codigo:"MED707", creditos:5 },
    { nombre:"Electiva Infectología", codigo:"MED708", creditos:3 }
  ]},

  { semestre: "Semestre 8", materias: [
    { nombre:"Hemato-Oncología", codigo:"MED801", creditos:4 },
    { nombre:"Inmunología y Reumatología", codigo:"MED802", creditos:4 },
    { nombre:"Salud Mental II", codigo:"MED803", creditos:4 },
    { nombre:"Pediatría II", codigo:"MED804", creditos:5 },
    { nombre:"Medicina Paliativa", codigo:"MED805", creditos:3 },
    { nombre:"Protocolo de Investigación", codigo:"MED806", creditos:3 },
    { nombre:"Endocrinología", codigo:"MED807", creditos:4 },
    { nombre:"Gastroenterología", codigo:"MED808", creditos:4 }
  ]},

  { semestre: "Semestre 9", materias: [
    { nombre:"Procedimientos Clínicos I", codigo:"MED901", creditos:4 },
    { nombre:"Toxicología", codigo:"MED902", creditos:3 },
    { nombre:"Medicina Legal", codigo:"MED903", creditos:3 },
    { nombre:"Ginecología", codigo:"MED904", creditos:5 },
    { nombre:"Cirugía General", codigo:"MED905", creditos:6 }
  ]},

  { semestre: "Semestre 10", materias: [
    { nombre:"Cirugía Cardiotorácica y Vascular", codigo:"MED1001", creditos:4 },
    { nombre:"Ortopedia y Traumatología", codigo:"MED1002", creditos:4 },
    { nombre:"Oftalmología y ORL", codigo:"MED1003", creditos:4 },
    { nombre:"Urología y Salud Sexual", codigo:"MED1004", creditos:3 },
    { nombre:"Procedimientos Clínicos II", codigo:"MED1005", creditos:4 },
    { nombre:"Especialidades Pediátricas", codigo:"MED1006", creditos:4 },
    { nombre:"Obstetricia", codigo:"MED1007", creditos:5 }
  ]},

  { semestre: "Semestre 11 – Internado Rotativo", materias: [
    { nombre:"Medicina Interna", codigo:"INT1101", creditos:12 },
    { nombre:"Cirugía", codigo:"INT1102", creditos:12 },
    { nombre:"Ginecología y Obstetricia", codigo:"INT1103", creditos:12 },
    { nombre:"Pediatría", codigo:"INT1104", creditos:12 },
    { nombre:"Pre-Rural", codigo:"INT1105", creditos:8 }
  ]}
];

const contenedor = document.getElementById("contenedor");

function guardar(){ localStorage.setItem("mallaUDLA", contenedor.innerHTML); }
function cargar(){ const g = localStorage.getItem("mallaUDLA"); if(g) contenedor.innerHTML = g; actualizar(); }
function actualizar(){
  const total = document.querySelectorAll(".materia").length;
  const ok = document.querySelectorAll(".materia.aprobada").length;
  document.getElementById("progresoTotal").textContent =
    total ? Math.round(ok/total*100) + "%" : "0%";
}

data.forEach(s=>{
  const d=document.createElement("div");
  d.className="semestre";
  d.innerHTML=`<h2>${s.semestre}</h2>`;
  s.materias.forEach(m=>{
    const mat=document.createElement("div");
    mat.className="materia";
    mat.innerHTML=`
      <strong>${m.nombre}</strong><br>
      <small>${m.codigo} | ${m.creditos} créditos</small>
      <div class="inputs">
        <input type="number" placeholder="P1">
        <input type="number" placeholder="P2">
        <input type="number" placeholder="P3">
      </div>
      <p>Nota final: <span class="final">0.00</span></p>
      <button class="boton">Aprobar</button>`;
    const i=mat.querySelectorAll("input");
    const f=mat.querySelector(".final");
    mat.addEventListener("input",()=>{
      const n=i[0].value*0.25+i[1].value*0.35+i[2].value*0.4;
      f.textContent=n.toFixed(2); guardar();
    });
    mat.querySelector(".boton").onclick=()=>{ mat.classList.toggle("aprobada"); actualizar(); guardar(); };
    d.appendChild(mat);
  });
  contenedor.appendChild(d);
});

cargar();
