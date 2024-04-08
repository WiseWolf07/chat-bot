//import { askPersonalData } from "./steps";
var nameValue;
var mailValue;
var orderNum;

//Start of the chatbot

function start(){
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    askName();
}

//Standart functions for elements changes and checking values

function removeAllButtons(fatherElement){
    const buttonContainer = document.getElementById(fatherElement);
    while(buttonContainer.firstChild){
        buttonContainer.removeChild(buttonContainer.firstChild);
    }
}

function createElementInput(type,id){
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.classList.add("input","interact");
    input.id = id;
    return input;
}

function createElementLabel(id,labelText){
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.className = "labels";
    label.innerHTML = labelText + ": ";
    return label;
}

function createElementButton(text){
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add("button","interact");
    return button;
}

function checkText(input, alertMessage, step){
    return function(){
        let value = input.value;
        if(value === "" || value === null){
            alert(alertMessage);
        }
        else{
            step();
        }
    }    
}

function checkMail(input, alertMessage, step){
    return function(){
        let value = input.value;
        if(value === "" || value === null || !value.includes("@") || !value.includes(".")){
            alert(alertMessage);
        }
        else{
            step();
        }
    }    
}

function checkNum(input, alertMessage, step, validLength){
    return function(){
        let value = input.value;
        if(value.length < validLength || value === null || isNaN(value)){
            alert(alertMessage);
        }
        else{
            step();
        }
    }    
}

function getValue(inputId){
    const value = document.getElementById(inputId).value;
    return value;
}

//Chatbot steps
// 1. Ask for personal data

function askName(){
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = "Hola<br>¿Cuál es tu nombre?";
    message.style.opacity = "1";
    const inputName = createElementInput("text", "name");
    const labelName = createElementLabel("name", "Nombre");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(labelName);
    buttonContainer.appendChild(inputName);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkText(inputName, "Por favor, introduce un nombre",askMail));
}

function askMail(){
    nameValue = getValue("name");
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${nameValue}, Digita tu correo electrónico, por favor.`;
    message.style.opacity = "1";
    const inputMail = createElementInput("email", "email");
    const labelMail = createElementLabel("email", "Correo electrónico");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(labelMail);
    buttonContainer.appendChild(inputMail);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkMail(inputMail, "Por favor, introduce un correo válido",askId));
}

function askId(){
    mailValue = getValue("email");
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${nameValue}, Digita tu número de identificación, por favor.`;
    message.style.opacity = "1";
    const inputId = createElementInput("text", "id");
    const labelId = createElementLabel("id", "Número de identificación");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(labelId);
    buttonContainer.appendChild(inputId);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkNum(inputId, "Por favor, introduce un número de identificación válido",askOrderNum, 1));
}

function askOrderNum(){
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${nameValue}, Digita el número de orden, por favor.<br>(5 digitos)`;
    message.style.opacity = "1";
    const inputOrderNum = createElementInput("text", "orderNum");
    const labelOrderNum = createElementLabel("orderNum", "Número de orden");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(labelOrderNum);
    buttonContainer.appendChild(inputOrderNum);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkNum(inputOrderNum, "Por favor, introduce un número de orden válido",generalMenu, 5));
}

// Case General Menu

function addBttnOptions(numButtons){
    const buttonContainer = document.getElementById("buttons-container");
    for(let i = 1; i <= numButtons; i++){
        let button = createElementButton(i.toString());
        buttonContainer.appendChild(button);
    }
}

function addBttnOptionsEvents(functionName){
    const funcNames = [`1`, `2`, `3`, `4`, `5`, `6`, `7`];
    const buttonContainer = document.getElementById("buttons-container");
    const buttons = buttonContainer.children;
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", functionName(funcNames[i]));
    }                     
}

function generalMenu(){
    orderNum = typeof(orderNum) === 'undefined' ? getValue("orderNum") : orderNum;
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    const message = document.getElementById("message");
    const messageText = `1. No recibí mi producto<br>
                        2. No recibí reembolso<br>
                        3. El producto no es lo que esperaba<br>
                        4. Cancelar pedido<br>
                        5. Calificación del producto<br>
                        6. Seguimiento producto<br>
                        7. Contacto del vendedor`
    message.innerHTML = `${messageText}`;
    message.style.opacity = "1";
    addBttnOptions(7);
    addBttnOptionsEvents(readGeneralMenu);
}

function readGeneralMenu(option){
    return function(){
        switch(option){
            case "1":
                productNotReceived();
                break;
            case "2":
                refundNotReceived();
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            case "7":
                break;
            default:
                break;
        }
    }    
}

    // 1. Case (1) Product not received

function productNotReceived(){
    removeAllButtons("buttons-container");
    addBttnOptions(4);
    addBttnOptionsEvents(readProductNotReceived)
    const message = document.getElementById("message");
    const messageText = `1. El limite de fecha de entrega ha pasado<br>
                        2. Aparece como entregado pero no he recibido mi producto<br>
                        3. El despachador canceló el envío<br>
                        4. Volver al menú anterior<br>`
    message.innerHTML = `${messageText}`;
}

function readProductNotReceived(option){
    return function(){
        switch(option){
            case "1":
                notReceivedCaseOne();
                break;
            case "2":
                notReceivedCaseOne();
                break;
            case "3":
                break;
            case "4":
                generalMenu();
                break;
            default:
                break;
        }
    }
}

        // 1.1|2. Case (1.1|2) Limit date reach or not received product NOT FINISH

    function notReceivedCaseOne(){
        removeAllButtons("buttons-container");
        addBttnOptions(4);
        addBttnOptionsEvents(readProductNotReceived)
        const message = document.getElementById("message");
        const messageText = `1. Solicitar reembolso<br>
                            2. Seguir esperando(Se le enviará un mensaje al vendedor)<br>
                            3. Volver al menú anterior<br>
                            4. Volver al menú principal<br>`
        message.innerHTML = `${messageText}`;
    }

        // 1.3. Case (1.3)  Order canceled by seller NOT FINISH
    function notReceivedCaseThree(){
        removeAllButtons("buttons-container");
        addBttnOptions(4);
        addBttnOptionsEvents(readProductNotReceived)
        const message = document.getElementById("message");
        const messageText = `1. Solicitar compensación<br>
                            2. Preguntar por la causa<br>
                            3. Volver al menú anterior<br>
                            4. Volver al menú principal<br>`
        message.innerHTML = `${messageText}`;
    }

    // 2. Case (2) Refund not received NOT FINISH
    function refundNotReceived(){
        removeAllButtons("buttons-container");
        addBttnOptions(3);
        addBttnOptionsEvents(readRefundNotReceived)
        const message = document.getElementById("message");
        const messageText = `1. Solicité un reembolso de un producto y no se ha efectuado<br>
                            2. Me aprobaron un reembolso y no me llegó el dinero a la tarjeta<br>
                            3. Volver al menú anterior<br>`
        message.innerHTML = `${messageText}`;
    }

    function readRefundNotReceived(option){
        return function(){
            switch(option){
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    generalMenu();
                    break;
                default:
                    break;
            }
        }
    }

    //3. Case (3) Product not what I expected NOT FINISH

    function productNotExpected(){
        removeAllButtons("buttons-container");
        addBttnOptions(3);
        addBttnOptionsEvents(readProductNotExpected)
        const message = document.getElementById("message");
        const messageText = `1. El producto es diferente a las imagenes mostradas<br>
                            2. El producto no cuenta con las especificaciones mostradas<br>
                            3. Volver al menú anterior<br>`
        message.innerHTML = `${messageText}`;
    }

    function readProductNotExpected(option){
        return function(){
            switch(option){
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    generalMenu();
                    break;
                default:
                    break;
            }
        }
    }

    //4. Case (4) Cancel order NOT FINISH

    function cancelOrder(){
        removeAllButtons("buttons-container");
        addBttnOptions(3);
        addBttnOptionsEvents(readCancelOrder)
        const message = document.getElementById("message");
        const messageText = `1. El producto ha tardado mucho y ya no lo quiero recibir<br>
                            2. Me dí cuenta que el producto no es lo que buscaba<br>
                            3. Volver al menú anterior<br>`
        message.innerHTML = `${messageText}`;
    }

    function readCancelOrder(option){
        return function(){
            switch(option){
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    generalMenu();
                    break;
                default:
                    break;
            }
        }
    }

    //5. Case (5) Product rating NOT FINISH

    function productRating(){
        removeAllButtons("buttons-container");
        addBttnOptions(3);
        addBttnOptionsEvents(readProductRating)
        const message = document.getElementById("message");
        const messageText = `1. Calificar producto<br>
                            2. Calificar vendedor<br>
                            3. Volver al menú anterior<br>`
        message.innerHTML = `${messageText}`;
    }

    function readProductRating(option){
        return function(){
            switch(option){
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    generalMenu();
                    break;
                default:
                    break;
            }
        }
    }

    //6. Case (6) Product tracking NOT FINISH

    function productTracking(){
        removeAllButtons("buttons-container");
        addBttnOptions(2);
        addBttnOptionsEvents(readProductTracking)
        const message = document.getElementById("message");
        const messageText = `1. Seguir el estado de mi pedido<br>
                            2. Volver al menú anterior<br>`
        message.innerHTML = `${messageText}`;
    }

    function readProductTracking(option){
        return function(){
            switch(option){
                case "1":
                    break;
                case "2":
                    generalMenu();
                    break;
                default:
                    break;
            }
        }
    }

    //7. Case (7) Seller contact NOT FINISH

    function sellerContact(){
        
    }

document.getElementById("start-button").addEventListener("click", start);