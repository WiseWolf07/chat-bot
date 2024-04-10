const personalValues = [];

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
    let value = document.getElementById(inputId).value;
    return value;
}

function containerTextTransitionOn(isOn){
    const message = document.getElementById("container-message");
    if(isOn) message.style.opacity = "1";
    else message.style.opacity = "0";
}

function putDelayVariable(funcName, delay, variable){
    return function(){
        personalValues.push(getValue(variable));
        removeAllButtons("buttons-container");
        removeAllButtons("buttons-accept");
        containerTextTransitionOn(false);
        setTimeout(funcName, delay);
    }
}

function putDelay(funcName, delay){
    removeAllButtons("buttons-container");
    removeAllButtons("buttons-accept");
    containerTextTransitionOn(false);
    setTimeout(funcName, delay);
}

function putDelayButtons(funcName, delay){
    return function(){
        removeAllButtons("buttons-container");
        removeAllButtons("buttons-accept");
        containerTextTransitionOn(false);
        setTimeout(funcName, delay);
    }
}
//Chatbot steps
// 1. Ask for personal data

function askName(){
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = "Hola<br>¿Cuál es tu nombre?";
    containerTextTransitionOn(true);
    const inputName = createElementInput("text", "name");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(inputName);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkText(inputName, "Por favor, introduce un nombre",putDelayVariable(askMail, 1000, "name")));
}

function askMail(){
    containerTextTransitionOn(true);
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${personalValues[0]}, Digita tu correo electrónico, por favor.`;
    const inputMail = createElementInput("email", "email");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(inputMail);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkMail(inputMail, "Por favor, introduce un correo válido",putDelayVariable(askId, 1000, "email")));
}

function askId(){
    containerTextTransitionOn(true);
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${personalValues[0]}, Digita tu número de identificación, por favor.`;
    const inputId = createElementInput("text", "id");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(inputId);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkNum(inputId, "Por favor, introduce un número de identificación válido",putDelayVariable(askOrderNum, 1000, "id"), 1));
}

function askOrderNum(){
    containerTextTransitionOn(true);
    const message = document.getElementById("message");
    const buttonContainer = document.getElementById("buttons-container");
    const buttonsContainerAccept = document.getElementById("buttons-accept");
    message.innerHTML = `${personalValues[0]}, Digita el número de orden, por favor.<br>(5+ digitos)`;
    const inputOrderNum = createElementInput("text", "orderNum");
    const buttonAccept = createElementButton("Aceptar");
    buttonContainer.appendChild(inputOrderNum);
    buttonsContainerAccept.appendChild(buttonAccept);
    buttonAccept.addEventListener("click", checkNum(inputOrderNum, "Por favor, introduce un número de orden válido",putDelayVariable(generalMenu, 1000, "orderNum"), 5));
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
    containerTextTransitionOn(true);
    const message = document.getElementById("message");
    const messageText = `1. No recibí mi producto<br>
                        2. No recibí reembolso<br>
                        3. El producto no es lo que esperaba<br>
                        4. Cancelar pedido<br>
                        5. Calificación del producto<br>
                        6. Seguimiento producto<br>
                        7. Contacto del vendedor`
    message.innerHTML = `${messageText}`;
    addBttnOptions(7);
    addBttnOptionsEvents(readGeneralMenu);
}

function readGeneralMenu(option){
    return function(){
        switch(option){
            case "1":
                putDelay(productNotReceived, 1000);
                break;
            case "2":
                putDelay(refundNotReceived, 1000);
                break;
            case "3":
                putDelay(productNotExpected, 1000);
                break;
            case "4":
                putDelay(cancelOrderMenu, 1000);
                break;
            case "5":
                putDelay(productRating, 1000);
                break;
            case "6":
                putDelay(productTracking, 1000);
                break;
            case "7":
                putDelay(sellerContact, 1000);
                break;
            default:
                break;
        }
    }    
}

    // 1. Case (1) Product not received

function productNotReceived(){
    containerTextTransitionOn(true);
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
                putDelay(notReceivedCaseOne, 1000);
                break;
            case "2":
                putDelay(notReceivedCaseOne, 1000);
                break;
            case "3":
                putDelay(notReceivedCaseThree, 1000);
                break;
            case "4":
                putDelay(generalMenu, 1000);
                break;
            default:
                break;
        }
    }
}

        // 1.1|2. Case (1.1|2) Limit date reach or not received product NOT FINISH

    function notReceivedCaseOne(){
        containerTextTransitionOn(true);
        addBttnOptions(4);
        addBttnOptionsEvents(readNotReceivedCaseOne)
        const message = document.getElementById("message");
        const messageText = `1. Solicitar reembolso<br>
                            2. Seguir esperando(Se le enviará un mensaje al vendedor)<br>
                            3. Volver al menú anterior<br>
                            4. Volver al menú principal<br>`
        message.innerHTML = `${messageText}`;
    }

    function readNotReceivedCaseOne(option){
        return function(){
            switch(option){
                case "1":
                    putDelay(askForCellphone, 1000);
                    break;
                case "2":
                    putDelay(waitProduct, 1000);
                    break;
                case "3":
                    putDelay(productNotReceived, 1000);
                    break;
                case "4":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }

            // 1.1.1|2.1.1 Case (1.1.1|2.1.1) Request reimbursement

    function askForCellphone(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const buttonContainer = document.getElementById("buttons-container");
        const buttonsContainerAccept = document.getElementById("buttons-accept");
        message.innerHTML = `${personalValues[0]}, Digita tu número de celular, por favor.`;
        const inputCellphone = createElementInput("text", "cellphone");
        const buttonAccept = createElementButton("Aceptar");
        buttonContainer.appendChild(inputCellphone);
        buttonsContainerAccept.appendChild(buttonAccept);
        buttonAccept.addEventListener("click", checkNum(inputCellphone, "Por favor, introduce un número de celular válido",putDelayVariable(giveMessage, 1000, "cellphone"), 10));
    }
    
    function giveMessage(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const buttonContainer = document.getElementById("buttons-accept");
        message.innerHTML = `${personalValues[0]}, En pocos minutos un asesor se comunicara con usted al número ${personalValues[personalValues.length - 1]}, gracias por su espera`;
        const buttonComeBack = createElementButton("Volver al menú principal");
        buttonContainer.appendChild(buttonComeBack);
        buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
    }    

            // 1.1.1|2.1. Case (1.1.1|2.1) Wait for product
    
    function waitProduct(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        message.innerHTML = `${personalValues[0]}, se está enviando un mensaje al vendedor para que se comunique con usted, espere por favor...`;
        setTimeout(waitProductResponse, 5000);
    }

    function waitProductResponse(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const buttonContainer = document.getElementById("buttons-accept");
        message.innerHTML = `El mensaje ha sido enviado`;
        const buttonComeBack = createElementButton("Volver al menú principal");
        buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
        buttonContainer.appendChild(buttonComeBack);
    }    

        // 1.3. Case (1.3)  Order canceled by seller NOT FINISH
    function notReceivedCaseThree(){
        containerTextTransitionOn(true);
        addBttnOptions(4);
        addBttnOptionsEvents(readNotReceivedCaseThree);
        const message = document.getElementById("message");
        const messageText = `1. Solicitar compensación<br>
                            2. Preguntar por la causa<br>
                            3. Volver al menú anterior<br>
                            4. Volver al menú principal<br>`
        message.innerHTML = `${messageText}`;
    }

    function readNotReceivedCaseThree(option){
        return function(){
            switch(option){
                case "1":
                    putDelay(askForCellphone,1000);
                    break;
                case "2":
                    putDelay(giveReason,1000);
                    break;
                case "3":
                    putDelay(productNotReceived,1000);
                    break;
                case "4":
                    putDelay(generalMenu,1000);
                    break;
                default:
                    break;
            }
        }
    }

            // 1.3.1 Case (1.3.1) Give reason for cancelation
    
    function generateReason(){
        const reasons = [`Error en la dirección o información del destinatario`,`Productos no disponibles o agotados`,`Problemas de pago`,
                        `Condiciones climáticas adversas`,`Problemas en la calidad del producto`];
        const random = Math.floor(Math.random() * reasons.length);
        return reasons[random];
    }

    function giveReason(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        let reason = generateReason();
        let buttonContainer = document.getElementById("buttons-accept");
        message.innerHTML = `${nameValue}, La razón de la cancelación de su pedido es: ${reason}`;
        const buttonComeBack = createElementButton("Volver al menú principal");
        buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
        buttonContainer.appendChild(buttonComeBack);
    }

    // 2. Case (2) Refund not received
    function refundNotReceived(){
        containerTextTransitionOn(true);
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
                    putDelay(askForCellphone, 1000);
                    break;
                case "2":
                    putDelay(askForCellphone, 1000);
                    break;
                case "3":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }

    //3. Case (3) Product not what I expected NOT FINISH

    function productNotExpected(){
        containerTextTransitionOn(true);
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
                    putDelay(productNotExpectedCases, 1000);
                    break;
                case "2":
                    putDelay(productNotExpectedCases, 1000);
                    break;
                case "3":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }  
    
    function productNotExpectedCases(){
        containerTextTransitionOn(true);
        addBttnOptions(5);
        addBttnOptionsEvents(readProductNotExpectedCases)
        const message = document.getElementById("message");
        const messageText = `1. Solicitar reembolso<br>
                            2. Solicitar compensación<br>
                            3. Solicitar cambio de producto<br>
                            4. Volver al menú anterior<br>
                            5. Volver al menú principal`
        message.innerHTML = `${messageText}`;
    }

    function readProductNotExpectedCases(option){
        return function(){
            switch(option){
                case "1":
                    putDelay(askForCellphone, 1000);
                    break;
                case "2":
                    putDelay(askForCellphone, 1000);
                    break;
                case "3":
                    putDelay(askForCellphone, 1000);
                    break;
                case "4":
                    putDelay(productNotExpected, 1000);
                    break;
                default:
                    break;
            }
        }
    }

    //4. Case (4) Cancel order

    function cancelOrderMenu(){
        containerTextTransitionOn(true);
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
                    putDelay(cancelOrder, 1000);
                    break;
                case "2":
                    putDelay(cancelOrder, 1000);
                    break;
                case "3":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }

    function cancelOrder(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const messageText = `${personalValues[0]}, ¿Esta seguro de que desea cancelar el producto de su orden #${personalValues[3]}?<br>`
        message.innerHTML = `${messageText}`;
        const buttonContainer = document.getElementById("buttons-accept");
        const buttonYes = createElementButton("Si");
        const buttonNo = createElementButton("No");
        buttonYes.addEventListener("click", putDelayButtons(isButtonYes(true), 1000));
        buttonNo.addEventListener("click", putDelayButtons(isButtonYes(false), 1000));
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
    }

    function isButtonYes(condition){
        return function(){
            containerTextTransitionOn(true);
            const message = document.getElementById("message");
            let messageText;
            if(condition){
                messageText = `El producto #${personalValues[3]} ha sido cancelado con éxito`
            }
            else{
                messageText = `Producto no cancelado`
            }
            message.innerHTML = `${messageText}`;
            let buttonContainer = document.getElementById("buttons-accept");
            const buttonComeBack = createElementButton("Volver al menú principal");
            buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
            buttonContainer.appendChild(buttonComeBack);
        }
    }

    //5. Case (5) Product rating

    function productRating(){
        containerTextTransitionOn(true);
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
                    putDelay(rateProduct, 1000);
                    break;
                case "2":
                    putDelay(rateSeller, 1000);
                    break;
                case "3":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }

    function rateProduct(){
        containerTextTransitionOn(true);
        addBttnOptions(5);
        addBttnOptionsEvents(responseRating)
        const message = document.getElementById("message");
        const messageText = `Del 1 al 5 ¿Cómo calificaría el producto #${personalValues[3]}?<br>`
        message.innerHTML = `${messageText}`;
    }

    function rateSeller(){
        containerTextTransitionOn(true);
        addBttnOptions(5);
        addBttnOptionsEvents(responseRating)
        const message = document.getElementById("message");
        const messageText = `Del 1 al 5 ¿Cómo calificaría el vendedor del producto #${personalValues[3]}?<br>`
        message.innerHTML = `${messageText}`;
    }

    function responseRating(rateNum){
        return function(){
            removeAllButtons("buttons-container");
            removeAllButtons("buttons-accept");
            containerTextTransitionOn(true);
            const message = document.getElementById("message");
            let messageText;
            if(rateNum <= 2){
                messageText = `Gracias por su calificación, lamentamos que no haya sido de su agrado`
            }
            else if(rateNum > 2 && rateNum <= 4){
                messageText = `Gracias por su calificación, trabajaremos para mejorar`
            }
            else{
                messageText = `Gracias por su calificación, nos alegra que haya quedado satisfecho`
            }
            message.innerHTML = `${messageText}`;
            let buttonContainer = document.getElementById("buttons-accept");
            const buttonComeBack = createElementButton("Volver al menú principal");
            buttonContainer.appendChild(buttonComeBack);
            buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
        }
    }

    //6. Case (6) Product tracking NOT FINISH

    function productTracking(){
        containerTextTransitionOn(true);
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
                    putDelay(trackingOrder, 1000);
                    break;
                case "2":
                    putDelay(generalMenu, 1000);
                    break;
                default:
                    break;
            }
        }
    }

    function trackingOrder(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const messageText = `Se está rastreando su producto...`;
        message.innerHTML = `${messageText}`;
        setTimeout(()=> message.innerHTML = `El estado del producto ${personalValues[3]} es: <strong>En camino</strong>.<br>
            Gracias por su compra`, 5000)
        let buttonContainer = document.getElementById("buttons-accept");
        const buttonComeBack = createElementButton("Volver al menú principal");
        buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
        buttonContainer.appendChild(buttonComeBack);
    }

    //7. Case (7) Seller contact NOT FINISH

    function sellerContact(){
        containerTextTransitionOn(true);
        const message = document.getElementById("message");
        const messageText = `El contacto del vendedor del producto #${personalValues[3]} es: <br>
                            Nombre: Juan Pérez<br>
                            Teléfono: 300 123 4567<br>
                            Correo: juanp@gmail.com`
        message.innerHTML = `${messageText}`;
        let buttonContainer = document.getElementById("buttons-accept");
        const buttonComeBack = createElementButton("Volver al menú principal");
        buttonComeBack.addEventListener("click", putDelayButtons(generalMenu, 1000));
        buttonContainer.appendChild(buttonComeBack);
    }

document.getElementById("start-button").addEventListener("click", start);
