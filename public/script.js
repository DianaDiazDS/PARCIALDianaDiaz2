console.log("Inicio del script");


fetch('https://api-dishes.vercel.app')
    .then(response => response.json())
    .then(data => {
        console.log("aqui")
        console.log(data); // Imprime la respuesta de la API
        console.log("aqui")
    })
    .catch(error => console.error(error));

// fetch('https://api-dishes.vercel.app')
//     .then(resp => resp.json())
//     .then(data => {
//         const tbody = document.getElementById('tbody');
//         console.log(data);

//         data.forEach(dish => {
//             const tr = document.createElement('tr');
            
//             const id = document.createElement('td');
//             id.appendChild(document.createTextNode(dish.idDish));
//             tr.appendChild(id);

//             const name = document.createElement('td');
//             name.appendChild(document.createTextNode(dish.name));
//             tr.appendChild(name);

//             const calories = document.createElement('td');
//             calories.appendChild(document.createTextNode(dish.calories));
//             tr.appendChild(calories);

//             const isVegetarian = document.createElement('td');
//             isVegetarian.appendChild(document.createTextNode(dish.isVegetarian ? 'Sí' : 'No'));
//             tr.appendChild(isVegetarian);

//             const value = document.createElement('td');
//             value.appendChild(document.createTextNode(dish.value));
//             tr.appendChild(value);

//             const comments = document.createElement('td');
//             comments.appendChild(document.createTextNode(dish.comments=="" ? "Sin comentarios":dish.comments));
//             tr.appendChild(comments);

//             tbody.appendChild(tr);
//         });
//     })
//     .catch(error => console.log(error));



    const Rellenartabla = () => {
        return new Promise((resolve, reject) => {
          fetch("https://api-dishes.vercel.app")
            .then((datos) => datos.json())
            .then((datos) => {
              datos.data.forEach((plato) => {
                console.log(plato);
                const row = document.createElement("tr");
      
                row.innerHTML = `
                <td>${plato.idDish}</td>
                      <td>${plato.name}</td>
                      <td>${plato.calories}</td>
                      <td>${plato.isVegetarian?"Si es":"No es"}</td>
                      <td>${plato.value}</td>
                      <td>${plato.comments=="" ? "Sin comentarios":plato.comments}</td>
                      `;
      
                document.getElementById("tbody").appendChild(row);
              });
            })
            .catch((error) => console.log(error));
        });
      };

      Rellenartabla();

      document.getElementById('btnSend').addEventListener('click',()=>{
        const URI = "http://localhost:2500/courses"
      
        fetch(URI,
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:loadFields()
          }).then( result => result.json())
            .then( result => {
              if( result.state ){
                alert('Success!!!!')
              }else{
                alert('Ohh! Algo ha salido mal')
              }
            }).catch( err => console.log(err))
      })



  //agregar

  
  const loadFields = ()=>{


    const idValue = document.getElementById('id').value  
    const NombreValue = document.getElementById('Nombre').value  
    // const CaloriasValue = document.getElementById('Calorias').value
    const CaloriasValue = parseInt(
        document.getElementById("Calorias").value
      );
    const VegetarianoValue = document.getElementById('Vegetariano').value
    const ValorValue = document.getElementById('Valor').value
    const ComentariosValue = document.getElementById('Comentarios').value

    const data = {
        "idDish": idValue,
        "name": NombreValue, 
        "calories": CaloriasValue, 
        "isVegetarian": VegetarianoValue,
        "value": ValorValue,
        "comments": ComentariosValue
      };
  
    return JSON.stringify(data)
  }
  
  document.getElementById('btnSend').addEventListener('click',()=>{
    const URI = "https://api-dishes.vercel.app"
  
    fetch(URI,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:loadFields()
      }).then( result => result.json())
        .then( result => {
          if( result.state ){
            alert('Success!!!!')
          }else{
            alert('Ohh! Algo ha salido mal')
          }
        }).catch( err => console.log(err))
  })
  
  const findById2 = () => {
    const option = document.getElementById("select-id");
    if (option.value != "Seleccione un ID") {
      return new Promise((resolve, reject) => {
        fetch(`https://api-dishes.vercel.app/${searchId}`)
          .then((platos) => platos.json())
          .then((platos) => {
            document.getElementById("tbody").innerHTML = "";
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${platos.data.idDish}</td>
                    <td>${platos.data.name}</td>
                    <td>${platos.data.calories}</td>
                    <td>${platos.data.isVegetarian ? "Si es" : "No es"}</td>
                    <td>${platos.data.value}</td>
                    <td>${
                      platos.data.comments == ""
                        ? "Sin comentarios"
                        : platos.data.comments
                    }</td>
                    <td><button class='btn btn-dark' value='${
                      platos.data._id
                    }' onclick='drop(this.value)'>Eliminar</button></td>
                    `;
  
            document.getElementById("tbody").appendChild(row);
          })
          .catch((error) => reject(error));
      });
    }
  };
  
