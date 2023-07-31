
var subjects = JSON.parse(localStorage.getItem("materiasHoraios@ufrn")) || [];
var btnAddSubject = document.querySelector('.btn-add-subject');
const confirmationCard = document.querySelector('.save-confirmation-card');
const messageConfirmationCard = document.querySelector('.save-confirmation-card p');

var timeout_card;
var timeout_message_card;



document.querySelector('#submit-form-create-subject').addEventListener('click', submit_form);

document.querySelector('#cancel-create-subject').addEventListener('click', cancel_form);

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
                        <td class='actions-table'>
                            <span onclick="delete_subject(${idc})" class='deletar-materia'>Deletar</span>    
                            <span onclick="view_form(${idc})" class='editar-materia'>Editar</span>
                        </td>`;
        table.appendChild(tr);
    }
}

function get_subjects(idcElement) {
    if (subjects[idcElement]['selecionada']) {
        subjects[idcElement]['selecionada'] = false;
    }  else {
        subjects[idcElement]['selecionada'] = true;
    }
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
        <th>Ações</th>
    </tr>`;
}

function view_form(idc) {
    
    if (idc != undefined) {
        document.getElementById('nome').value = subjects[idc]['componente'];
        document.getElementById('professor').value = subjects[idc]['professor'];
        document.getElementById('cargaHoraria').value = subjects[idc]['cargaHoraria'];
        document.getElementById('horario').value = subjects[idc]['horario'];
        document.getElementById('local').value = subjects[idc]['local'];
        document.getElementById('id').value = idc;
    }

    document.querySelector('.form-create-subject').style.visibility = 'visible';
}

function cancel_form() {
    document.querySelector('.form-create-subject').style.visibility = 'hidden';
    document.querySelector('.form-create-subject form').reset();
}

function submit_form() {
    const nome = document.getElementById('nome').value;
    const professor = document.getElementById('professor').value;
    const cargaHoraria = Number(document.getElementById('cargaHoraria').value);
    const horario = document.getElementById('horario').value;
    const local = document.getElementById('local').value;
    const id = document.getElementById('id').value;

    if (id=="") {
        if (nome!="" && horario !="") {
            create_subject(nome, professor, cargaHoraria, horario, local);
            update_timetables();
            show_confirmation_card("Matéria adicionada!");
        }
    } else {
        edit_subject(id, nome, professor, cargaHoraria, horario, local);
        update_timetables();
        show_confirmation_card("Matéria editada!");
    }

    clean_table();
    sort_subjects();
    view_subjects();

    document.querySelector('.form-create-subject').style.visibility = 'hidden';
    document.querySelector('.form-create-subject form').reset();

}

function hidden_confirmation_card() {
    confirmationCard.style.visibility = 'hidden';
    confirmationCard.style.transform = 'translate(-50%, -60px)';
    confirmationCard.style.opacity = '0%';

    timeout_message_card = setTimeout(()=>{messageConfirmationCard.innerHTML = "";}, 300);
}

function show_confirmation_card(message) {
    confirmationCard.style.visibility = 'visible';
    confirmationCard.style.transform = 'translate(-50%, 0px)';
    confirmationCard.style.opacity = '100%';
    messageConfirmationCard.innerHTML = message;

    clearTimeout(timeout_card);
    clearTimeout(timeout_message_card);

    timeout_card = setTimeout(hidden_confirmation_card, 5000);
}

function save() {
    localStorage.setItem("materiasHoraios@ufrn", JSON.stringify(subjects));

    show_confirmation_card("Alterações salvas!");
}

function create_subject(nome, professor, cargaHoraria, horario, local) {
    var subject = {
        'professor':professor.toUpperCase(), 
        'componente':nome.toUpperCase(), 
        'carga_horaria':cargaHoraria, 
        'horario':horario.toUpperCase(), 
        'local':local.toUpperCase(),
        'selecionada':false
    }
    subjects.push(subject);
}

function delete_subject(idc) {

    subjects.splice(idc, 1);

    clean_table();
    view_subjects();
    update_timetables();

    show_confirmation_card("Matéria excluída com sucesso!");
}

function edit_subject(idc, nome, professor, cargaHoraria, horario, local) {
    subjects[Number(idc)]['componente'] = nome.toUpperCase();
    subjects[Number(idc)]['professor'] = professor.toUpperCase();
    subjects[Number(idc)]['cargaHoraria'] = cargaHoraria;
    subjects[Number(idc)]['horario'] = horario.toUpperCase();
    subjects[Number(idc)]['local'] = local.toUpperCase();
}