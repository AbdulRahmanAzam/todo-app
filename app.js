var firebaseConfig = {
    // adding your Firebase config here
apiKey: "AIzaSyDssItpvK1BxcNI9Q_YHuVVVeCo0GfWyrA",
authDomain: "rahman-to-do.firebaseapp.com",
databaseURL: "https://rahman-to-do-default-rtdb.firebaseio.com",
projectId: "rahman-to-do",
storageBucket: "rahman-to-do.appspot.com",
messagingSenderId: "48723053593",
appId: "1:48723053593:web:ac3fee701115dbd9032e88"
};
var app = firebase.initializeApp(firebaseConfig);

var list = document.getElementById('list');

app.database().ref('todo').on("child_added", function(data) {
    // Li Create and text node
    // var li = document.createElement('li');
    var LiText = document.createTextNode(data.val().value);
    // li.appendChild(LiText);
    // list.appendChild(li);

    // Edit button Create and text node;
    var editBtn = document.createElement("button");
    var editNode = document.createTextNode("Edit");
    editBtn.appendChild(editNode);
    editBtn.setAttribute("onclick", "editButton(this)")
    editBtn.setAttribute("id", data.val().key);
    editBtn.setAttribute("class", "edit")
    // li.appendChild(editBtn)

    //Delete button Create and text node;
    var delBtn = document.createElement('button');
    var delNode = document.createTextNode("Delete");
    delBtn.setAttribute("class", "delete");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delNode);
    // li.appendChild(delBtn)
    
    //creating div1 and div2 and append
    var div1 = document.createElement('div')
    div1.setAttribute('class','tasks')
    div1.appendChild(LiText)
    
    var div2 = document.createElement('div')
    div2.setAttribute('class','div2')
    div2.appendChild(editBtn)
    div2.appendChild(delBtn)
    
    //creating one more div for assigning div and div2
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("id","main")
    mainDiv.appendChild(div1);
    mainDiv.appendChild(div2);  

    var main = document.getElementById("mains");
    main.appendChild(mainDiv);
    // list.appendChild(div1)
    // list.appendChild(div2)
});

function addtodo() {
    //push data in firebase
    var todo_Item = document.getElementById('inp');
    var key = app.database().ref('todo').push().key;
    var todo = {
        value: todo_Item.value,
        key: key
    };
    app.database().ref('todo').child(key).set(todo);
    todo_Item.value = "";
}

function deleteItem(val) {
    //delete button of single item
    app.database().ref('todo').child(val.id).remove();
    val.parentNode.parentNode.remove()
}

function DeleteAll() {
    //dalete button of all item
    var mains =  document.getElementById('mains')
    app.database().ref('todo').remove();
    mains.innerHTML = "";
}

function editButton(val) {
    //edit button of single item
    var editValue = prompt("Enter Edit Value", val.parentNode.parentNode.childNodes[0].textContent);
    var editTodo = {
        value: editValue,
        key: val.id,
        // PrivateKey: Math.random().toFixed(8)
    };
    app.database().ref('todo').child(val.id).set(editTodo);
    val.parentNode.parentNode.childNodes[0].textContent = editValue;
}