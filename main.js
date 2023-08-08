
var subjects = JSON.parse(localStorage.getItem("materiasHoraios@ufrn")) || [];
var btnAddSubject = document.querySelector('.btn-add-subject');
const confirmationCard = document.querySelector('.save-confirmation-card');
const messageConfirmationCard = document.querySelector('.save-confirmation-card p');
const tableHorarios = document.getElementById('table-horarios');

var timeout_card;
var timeout_message_card;



document.querySelector('#submit-form-create-subject').addEventListener('click', submit_form);

document.querySelector('#cancel-create-subject').addEventListener('click', cancel_form);

document.querySelector('.btn-salvar').addEventListener('click', save);

sort_subjects();
view_subjects();
get_timetables();


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
            tr.innerHTML = `<td><input checked type="checkbox" name="disciplina" id="${idc}" onclick='check_element(${idc})'></td>`
        } else {
            tr.innerHTML = `<td><input type="checkbox" name="disciplina" id="${idc}" onclick='check_element(${idc})'></td>`
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

function check_element(idcElement) {
    if (subjects[idcElement]['selecionada']) {
        subjects[idcElement]['selecionada'] = false;
    }  else {
        subjects[idcElement]['selecionada'] = true;
    }
}

function clean_timetable() {
    tableHorarios.innerHTML = `<tr>
    <th>Horário</th>
    <th>Segunda</th>
    <th>Terça</th>
    <th>Quarta</th>
    <th>Quinta</th>
    <th>Sexta</th>
    </tr>`;
}

function get_timetables() {
    var idSubjects = subjects.filter(function(obj){return obj['selecionada']==true});

    
    var timetablesSubjects = new Map([
        ['M1', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '07:00-07:50'],
                ['vazio', 1],
            ])
        ],
        ['M2', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '07:50-08:40'],
                ['vazio', 1],
            ])
        ],
        ['M3', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '08:55 - 09:45'],
                ['vazio', 1],
            ])
        ],
        ['M4', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '09:45 - 10:35'],
                ['vazio', 1],
            ])
        ],
        ['M5', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '10:50 - 11:40'],
                ['vazio', 1],
            ])
        ],
        ['M6', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '11:40 - 12:30'],
                ['vazio', 1],
            ])
        ],
        ['T1', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '13:00 - 13:50'],
                ['vazio', 1],
            ])
        ],
        ['T2', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '13:50 - 14:40'],
                ['vazio', 1],
            ])
        ],
        ['T3', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '14:55 - 15:45'],
                ['vazio', 1],
            ])
        ],
        ['T4', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '15:45 - 16:35'],
                ['vazio', 1],
            ])
        ],
        ['T5', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '16:50 - 17:40'],
                ['vazio', 1],
            ])
        ],
        ['T6', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '17:40 - 18:30'],
                ['vazio', 1],
            ])
        ],
        ['N1', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '18:45 - 19:35'],
                ['vazio', 1],
            ])
        ],
        ['N2', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '19:35 - 20:25'],
                ['vazio', 1],
            ])
        ],
        ['N3', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '20:35 - 21:25'],
                ['vazio', 1],
            ])
        ],
        ['N4', 
            new Map([
                ['2', ''],
                ['3', ''],
                ['4', ''],
                ['5', ''],
                ['6', ''],
                ['hora', '21:25 - 22:15'],
                ['vazio', 1],
            ])
        ],
    ]);


    for (var subject of idSubjects) {
        var turno;
        var horarios;
        var dias;

        if (subject['horario'].indexOf('M')!=-1) turno='M';
        else if (subject['horario'].indexOf('T')!=-1) turno='T';
        else turno='N';

        var indexCaracTurn = subject['horario'].indexOf(turno);

        horarios = subject['horario'].slice(indexCaracTurn+1).split('');
        dias = subject['horario'].slice(0, indexCaracTurn).split('');

        for (var hor of horarios) {
            for (var dia of dias) {
                var materia = timetablesSubjects.get(turno + hor).get(dia);
                if (materia != '') { 
                    timetablesSubjects.get(turno + hor).set(dia, materia+', ' + subject['componente']);
                } else {
                    timetablesSubjects.get(turno + hor).set(dia, subject['componente']);
                }
                timetablesSubjects.get(turno + hor).set('vazio', 0);
            }
        }
    }

    update_timetables(timetablesSubjects);
}


function update_timetables(timetablesSubjects) {

    const keys = timetablesSubjects.keys();
    clean_timetable();


    for (key of keys) {

        if (!timetablesSubjects.get(key).get('vazio')) {
            
            const trElement = document.createElement('tr'); 
            trElement.innerHTML += `<td>${timetablesSubjects.get(key).get('hora')}</td>`;
            trElement.classList.add(`turno-${key[0]}`);

            for (var i=2; i <= 6; i++) {
                if (timetablesSubjects.get(key).get(`${i}`).indexOf(',')>-1) {
                    trElement.innerHTML += `<td class='conflict'>${timetablesSubjects.get(key).get(`${i}`)}</td>`;
                } else {
                    trElement.innerHTML += `<td>${timetablesSubjects.get(key).get(`${i}`)}</td>`;
                }
            }
            
            tableHorarios.appendChild(trElement);
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
            show_confirmation_card("Matéria adicionada!");
        }
    } else {
        edit_subject(id, nome, professor, cargaHoraria, horario, local);
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

    show_confirmation_card("Matéria excluída com sucesso!");
}

function edit_subject(idc, nome, professor, cargaHoraria, horario, local) {
    subjects[Number(idc)]['componente'] = nome.toUpperCase();
    subjects[Number(idc)]['professor'] = professor.toUpperCase();
    subjects[Number(idc)]['cargaHoraria'] = cargaHoraria;
    subjects[Number(idc)]['horario'] = horario.toUpperCase();
    subjects[Number(idc)]['local'] = local.toUpperCase();
}