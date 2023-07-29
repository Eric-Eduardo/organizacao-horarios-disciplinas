// var subjects = [
//     {
//         'codigo':'DIM0121', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246M34', 
//         'local':"DIMAP",
//         'professor': ""
//     },{
//         'codigo':'DIM0121', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246N12', 
//         'local':"DIMAP",
//         'professor': ""
//     },{
//         'codigo':'DIM0132', 
//         'componente':"PROBABILIDADE", 
//         'carga_horaria':60, 
//         'horario':'35M34', 
//         'local':"DIMAP",
//         'professor': ""
//     },{
//         'codigo':'IMD0029', 
//         'componente':"ESTRUTURA DE DADOS BÁSICAS I", 
//         'carga_horaria':60, 
//         'horario':'35T12', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0029', 
//         'componente':"ESTRUTURA DE DADOS BÁSICAS I", 
//         'carga_horaria':60, 
//         'horario':'35N12', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0029', 
//         'componente':"ESTRUTURA DE DADOS BÁSICAS I", 
//         'carga_horaria':60, 
//         'horario':'35M12', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0030', 
//         'componente':"LINGUAGEM DE PROGRAMAÇÃO I", 
//         'carga_horaria':60, 
//         'horario':'35T34', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0030', 
//         'componente':"LINGUAGEM DE PROGRAMAÇÃO I", 
//         'carga_horaria':60, 
//         'horario':'35N34', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0033', 
//         'componente':"PROBABILIDADE", 
//         'carga_horaria':60, 
//         'horario':'24M34', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0033', 
//         'componente':"PROBABILIDADE", 
//         'carga_horaria':60, 
//         'horario':'24N34', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0038', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246M56', 
//         'local':"IMD",
//         'professor': ""
//     },{
//         'codigo':'IMD0121', 
//         'componente':"ARQUITETURA DE COMPUTADORES", 
//         'carga_horaria':60, 
//         'horario':'35M56', 
//         'local':"IMD",
//         'professor': ""
//     },
//     {
//         'codigo':'IMD0121', 
//         'componente':"ARQUITETURA DE COMPUTADORES", 
//         'carga_horaria':60, 
//         'horario':'24N12', 
//         'local':"IMD",
//         'professor': ""
//     }
// ];

// var subjects = [
//     {
//         'codigo':'DIM0121', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246M34', 
//         'local':"DIMAP",
//         'professor': "",
//         'selecionada': true
//     },{
//         'codigo':'DIM0121', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246M34', 
//         'local':"DIMAP",
//         'professor': "",
//         'selecionada': false
//     },{
//         'codigo':'DIM0121', 
//         'componente':"FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II", 
//         'carga_horaria':90, 
//         'horario':'246M34', 
//         'local':"DIMAP",
//         'professor': "",
//         'selecionada': true
//     }
// ];

var subjects = JSON.parse(localStorage.getItem("materiasHoraios@ufrn")) || [];

var btnAddSubject = document.querySelector('.btn-add-subject');

document.querySelector('#submit-form-create-subject').addEventListener('click', create_subject);

btnAddSubject.addEventListener('click', ()=>{
    document.querySelector('.form-create-subject').style.visibility = 'visible';
});

document.querySelector('#cancel-create-subject').addEventListener('click', () => {
    document.querySelector('.form-create-subject').style.visibility = 'hidden';
    // document.getElementById('#reset-form').reset();
    document.querySelector('.form-create-subject form').reset();
});

document.querySelector('.btn-salvar').addEventListener('click', save);
sort_subjects();
view_subjects();
update_timetables();


function sort_subjects() {
    subjects.sort(function(a,b) {
        return a['componente'] < b['componente'] ? -1 : a['componente'] > b['componente'] ? 1 : 0;
    });
}

function view_subjects() {
    var table = document.getElementById('table-disciplinas');

    for (idc in subjects){
        var tr = document.createElement('tr');
        
        if (subjects[idc]['selecionada'] == true) {
            tr.innerHTML = `<td><input checked type="checkbox" name="disciplina" id="${idc}" onclick='get_subjects(${idc})'></td>`
        } else {
            tr.innerHTML = `<td><input type="checkbox" name="disciplina" id="${idc}" onclick='get_subjects(${idc})'></td>`
        }
        tr.innerHTML += `<td>${subjects[idc]['componente']} (${subjects[idc]['carga_horaria']}h)</td>
                        <td>${subjects[idc]['professor']}</td> 
                        <td>${subjects[idc]['horario']}</td>
                        <td>${subjects[idc]['local']}</td>
                        <td><span onclick="delete_subject(${idc})" class='deletar-materia'>Deletar</span></td>`;
        table.appendChild(tr);
    }
}

function get_subjects(idcElement) {
    // var selectedSubjects = document.querySelectorAll("input[type='checkbox']:checked");
    // var idSubjects = [];
    // console.log(subjects[0]['selecionada']);
    // subjects[idcElement]['selecionada'];
    if (subjects[idcElement]['selecionada']) {
        subjects[idcElement]['selecionada'] = false;
    }  else {
        subjects[idcElement]['selecionada'] = true;
    }
    // for (var subject of selectedSubjects) {
    //     idSubjects.push(parseInt(subject.id));
    // }
    
    // console.log(idSubjects);

    update_timetables();
}

function clean_timetable() {
    const tds = document.querySelectorAll("table#table-horarios tr td:not(:first-child)");
    for (td of tds) {
        td.innerHTML = '';
        td.classList.remove('conflict');
    }
}

// Aprimorar para aulas com mais de 2 horários
function update_timetables() {
    var idSubjects = subjects.filter(function(obj){return obj['selecionada']==true});

    console.log(idSubjects);
    // console.log(subjects);
    clean_timetable();

    var dias = [];
    var horario = "";
    var strId="";
    for (obj of idSubjects) {
        horario = obj['horario'].slice(-3);
        dias =  obj['horario'].slice(0, -3).split('');
        
        for (dia of dias) {
            strId=`${dia}-${horario}`;
            var texto = document.getElementById(strId);

            if (texto.textContent != "") {
                texto.innerHTML+='<br><br>'+obj['componente'];
                document.getElementById(strId).classList.add('conflict');
            } else { 
                texto.innerHTML+=obj['componente'];
            }
        }
    }
}

function clean_table() {
    document.querySelector('#table-disciplinas').innerHTML = `<tr>
    <th></th>
    <th>Componente curricular</th>
    <th>Professor</th>
    <th>Horário</th>
    <th>Local</th>
    <th></th>
</tr>`;
}

function create_subject() {
    const nome = document.getElementById('nome').value;
    const professor = document.getElementById('professor').value;
    const cargaHoraria = Number(document.getElementById('cargaHoraria').value);
    const horario = document.getElementById('horario').value;
    const local = document.getElementById('local').value;

    if (nome!="" && horario !="") {
        var subject = {
            'professor':professor.toUpperCase(), 
            'componente':nome.toUpperCase(), 
            'carga_horaria':cargaHoraria, 
            'horario':horario.toUpperCase(), 
            'local':local.toUpperCase(),
            'selecionada':false
        }
        subjects.push(subject);
        clean_table();
        sort_subjects();
        view_subjects();

        document.querySelector('.form-create-subject').style.visibility = 'hidden';
        document.querySelector('.form-create-subject form').reset();
    }
}

function save() {
    localStorage.setItem("materiasHoraios@ufrn", JSON.stringify(subjects));
}


function delete_subject(idc) {
    subjects.splice(idc, 1);
    console.log(subjects);
    clean_table();
    view_subjects();
}