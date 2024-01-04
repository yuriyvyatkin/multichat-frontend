(()=>{"use strict";class e{constructor(e){this.input=e}outputError(e){this.input.insertAdjacentHTML("afterend",`<p class="error">${e}</p>`),this.input.disabled=!0,setTimeout((()=>{this.input.disabled=!1,this.input.nextElementSibling.remove()}),2e3)}}class t{static getUsersHTML(e,t){let s="";return e.forEach((e=>{s+=`\n        <li class="users-list__user ${e===t?"self":""}">${e===t?"Вы":e}</li>\n      `})),s}static getTime(){const e=new Date;return new Intl.DateTimeFormat("ru-RU",{dateStyle:"short",timeStyle:"short"}).format(e).split(",").reverse().join(" ")}static addMessage(e,t,s,r){const a=this.getTime();e.insertAdjacentHTML("beforeend",`\n      <div class="message ${t.author===s?"self":""}">\n        <div class="message__header">${t.author===s?"Вы":t.author}, ${a}</div>\n        <div class="message__text">${t.message}</div>\n      </div>\n    `),r.scrollTo(0,r.scrollHeight)}}const s=document.querySelector(".modal"),r=s.querySelector(".modal__form"),a=r.querySelector(".modal-form__input"),i=document.querySelector(".chat-widget"),n=i.querySelector(".chat-widget__messages-container"),o=i.querySelector(".chat-widget__messages"),c=i.querySelector(".chat-widget__input"),d=document.querySelector(".status-loading"),l=new e(a),u="multichat-backend-7ec32d97624b.herokuapp.com",h=new class extends e{constructor(e,t,s,r){super(s),this.modal=t,this.loading=r,this.baseUrl=e,this.contentTypeHeader={"Content-Type":"application/json"}}connection(){fetch(`${this.baseUrl}/check`).then((()=>{this.loading.classList.remove("active"),this.modal.classList.add("active")}),(()=>{this.connection()}))}add(e){return this.input.disabled=!0,this.input.placeholder="Подождите, ваш запрос обрабатывается...",fetch(`${this.baseUrl}/users`,{body:JSON.stringify(e),method:"POST",headers:this.contentTypeHeader}).then((e=>{if(!e.ok)throw Error(e.statusText);return e})).catch((e=>{this.input.placeholder="","Failed to fetch"===e.message?this.outputError("Ошибка! Сервер недоступен."):"Bad Request"===e.message?this.outputError("Ошибка! Имя уже существует."):this.outputError(`Неизвестная ошибка: ${e.message}.`)}))}}(`https://${u}`,s,a,d);h.connection(),r.onsubmit=e=>{e.preventDefault();const{value:r}=a;if(!r||!r.trim())return a.value="",void l.outputError("Ошибка! Введено пустое значение.");const d=r.trim();a.value="",(async()=>{if(await h.add({name:d})){const e=new WebSocket(`wss://${u}`);c.addEventListener("keyup",(t=>{if("Enter"===t.key){const{value:t}=c;if(!t||!t.trim())return void(c.value="");const s=JSON.stringify({author:d,message:t.trim()});e.send(s),c.value=""}})),document.onclick=e=>{e.target.closest(".chat-widget")||(c.value="")};const r=document.querySelector(".users-list-container"),a=r.querySelector(".users-list");e.addEventListener("message",(e=>{const s=JSON.parse(e.data);Array.isArray(s)?(a.textContent="",a.insertAdjacentHTML("beforeend",t.getUsersHTML(s,d))):"object"==typeof s&&t.addMessage(o,s,d,n)})),e.addEventListener("close",(()=>{c.disabled=!0,c.placeholder="Работа сервера приостановлена"})),e.addEventListener("open",(()=>{c.disabled=!1,c.placeholder="Введите ваше сообщение"})),s.classList.remove("active"),setInterval((()=>{r.classList.add("active")}),1e3),i.classList.add("active"),c.value="",c.focus()}})()}})();