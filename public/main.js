const form = document.getElementById('form');
const alertsms = document.querySelector('.alertsms');
const tableAlert = document.querySelector('.tableAlert');
const dialog = document.getElementById('dialog');
const updateForm = document.getElementById('updateForm');
let currentUserId = null;

function sendRequest(data) {
    let request = new XMLHttpRequest();

    request.open('POST', "/create-user", true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    let jsonDataSend = JSON.stringify(data);
    request.send(jsonDataSend);

    request.onload = function() {
        let response = JSON.parse(request.responseText);
        if (request.status === 200 && request.readyState === 4) {
            if (response.status === 'success') {
                alertsms.innerHTML = "User has Craeted successfully!";
                alertsms.style.color = "green";
                setTimeout(() => {
                    alertsms.innerHTML = "";
                    fetchData();
                }, 3000);
            } else {
                alertsms.innerHTML = response.message;
                alertsms.style.color = "red";
                setTimeout(() => {
                    alertsms.innerHTML = "";
                }, 3000);
            }
        } else {
            alertsms.innerHTML = response.message + response.error;
            alertsms.style.color = "red";
            setTimeout(() => {
                alertsms.innerHTML = "";
            }, 3000);
        }
    };
}

const fetchData = async() => {
    const table = document.getElementById('table');
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error("Network was not ok!");
        } else {
            const data = await response.json();

            if (data.length > 0) {
                tableAlert.innerHTML = 'Data is loading...............';
                tableAlert.style.textAlign = 'center';
                tableAlert.style.color = 'green';
                setTimeout(() => {
                    let output = `
                    <table border="1" id="mainTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;
                    data.forEach((d, i) => {
                        output += `<tr id="trows">
                            <td>${i + 1}</td>
                            <td>${d.name}</td>
                            <td>${d.email}</td>
                            <td class="action">
                                <button onclick="deleteUser(${d.id})">Delete</button>
                                <button class="openDialog" data-id="${d.id}" data-name="${d.name}" data-email="${d.email}">Update</button>
                            </td>
                        </tr>`;
                    });
                    output += `</tbody></table>`;
                    output += `<button onclick="deleteAll()" id="clearT">Clear Table</button>`;
                    table.innerHTML = output;
                    tableAlert.innerHTML = '';

                    const openDialogs = document.querySelectorAll('.openDialog');
                    openDialogs.forEach(openDialog => {
                        openDialog.addEventListener('click', (event) => {
                            currentUserId = event.target.getAttribute('data-id');
                            document.getElementById('updatename').value = event.target.getAttribute('data-name');
                            document.getElementById('updateemail').value = event.target.getAttribute('data-email');
                            dialog.showModal();
                        });
                    });

                    document.getElementById('closeDialog').addEventListener('click', () => {
                        dialog.close();
                    });
                }, 500);
            } else {
                table.innerHTML = "<p>No users exist!</p>";
            }
        }
    } catch (err) {
        console.log(err);
    }
};
fetchData();

//update user function
const updateUser = async(id, userData) => {
    try {
        const response = await fetch(`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        } else {
            alertsms.innerHTML = `User id ${id} has updated!`;
            setTimeout(() => { alertsms.innerHTML = '' }, 1000)
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
};

updateForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const updatename = document.getElementById('updatename').value;
    const updateemail = document.getElementById('updateemail').value;
    await updateUser(currentUserId, { name: updatename, email: updateemail });
    updateForm.reset();
    fetchData();
    dialog.close();
});



//delete option function
const deleteUser = async(id) => {
    const response = await fetch(`/delete-user/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error("Network is not okay!");
    } else {
        const result = await response.json();
        console.log(result);
        alertsms.innerHTML = `ID ${id} User has deleted!`;
        alertsms.style.color = 'red';
        setTimeout(() => {
            alertsms.innerHTML = '';
        }, 3000)
        fetchData();
    }
}

//delete all user function
const deleteAll = async() => {
    const response = await fetch('/delete/all', { method: 'DELETE' });
    if (!response.ok) {
        throw new Error("Network is not okay!");
    } else {
        const result = await response.json();
        window.location.reload();
        fetchData();
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name !== '' || email !== '') {
        let data = { name, email };
        sendRequest(data);
        fetchData();
    } else {
        alertsms.innerHTML = "Please fill the inputs!";
        setTimeout(() => {
            alertsms.innerHTML = '';
        }, 3000);
    }
    form.reset();
});


// dialog function