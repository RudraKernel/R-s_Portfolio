/* contact.js — pick a topic, get a pre-written message, send it to /api/contact (email fallback) */
(function(){'use strict';
var CFG={email:'vivariumextimus@gmail.com',api:'/api/contact'};
var T={
 project:{tag:'PROJECT',text:"Hi Rudra! I want to build a project with you. Here's what I have in mind: "},
 edit:{tag:'EDITING',text:"Hi Rudra! I want you to edit my video. Here are the details (type of video, length, deadline): "},
 film:{tag:'FILMY',text:"Hi Rudra! I want to make something filmy with you. Here's the idea: "}};
var box=document.getElementById('reach');if(!box)return;
var opts=[].slice.call(box.querySelectorAll('.rc-o')),f=document.getElementById('rcf'),wa=document.getElementById('rcwa'),
    st=document.getElementById('rcs'),btn=document.getElementById('rcsend'),kind='',last='';
function wlink(){var m='['+T[kind].tag+'] '+f.msg.value.trim()+(f.name.value.trim()?'\n- '+f.name.value.trim():'');
  wa.href='mailto:'+CFG.email+'?subject='+encodeURIComponent('['+T[kind].tag+'] '+(f.name.value.trim()||'Portfolio message'))+'&body='+encodeURIComponent(m)}
opts.forEach(function(o){o.addEventListener('click',function(){
  kind=o.dataset.k;opts.forEach(function(x){x.setAttribute('aria-checked',x===o)});
  var cur=f.msg.value.trim();if(!cur||cur===last.trim())f.msg.value=T[kind].text;last=T[kind].text;
  f.hidden=false;st.textContent='';st.className='';wlink();
  setTimeout(function(){f.msg.focus({preventScroll:true});f.msg.setSelectionRange(f.msg.value.length,f.msg.value.length);
    f.scrollIntoView({behavior:'smooth',block:'nearest'})},60)})});
f.addEventListener('input',function(){if(kind)wlink()});
f.addEventListener('submit',function(e){e.preventDefault();
  if(!kind){st.textContent='Pick a topic first.';return}
  if(!f.name.value.trim()||!f.contact.value.trim()||f.msg.value.trim().length<5){st.className='err';st.textContent='Please add your name, how I can reach you, and a message.';return}
  btn.disabled=true;btn.textContent='Sending...';st.className='';st.textContent='';
  var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},12000);
  fetch(CFG.api,{method:'POST',headers:{'Content-Type':'application/json'},signal:ctl&&ctl.signal,
    body:JSON.stringify({kind:kind,name:f.name.value,contact:f.contact.value,msg:f.msg.value,website:f.website.value})})
  .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){if(!j.ok)throw 0;
    st.className='ok';st.textContent='Sent! Your message is in my inbox. I will get back to you soon.';f.reset();f.hidden=true;
    opts.forEach(function(x){x.setAttribute('aria-checked',false)});kind='';last=''})
  .catch(function(){st.className='err';st.textContent="Couldn't send from here. Tap Email instead, your message is already filled in.";wa.classList.add('flash')})
  .then(function(){clearTimeout(tm);btn.disabled=false;btn.textContent='Send to Rudra'})});
})();
