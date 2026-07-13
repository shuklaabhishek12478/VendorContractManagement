import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HealthItem{

  name:string;

  status:'Healthy'|'Warning'|'Offline';

  icon:string;

}

@Component({

selector:'app-system-health',

standalone:true,

imports:[CommonModule],

templateUrl:'./system-health.html',

styleUrls:['./system-health.scss']

})
export class SystemHealthComponent{

services:HealthItem[]=[

{

name:'API Server',

status:'Healthy',

icon:'🌐'

},

{

name:'SQL Database',

status:'Healthy',

icon:'🗄️'

},

{

name:'Email Service',

status:'Healthy',

icon:'📧'

},

{

name:'Hangfire Jobs',

status:'Healthy',

icon:'⚙️'

},

{

name:'File Storage',

status:'Healthy',

icon:'📁'

},

{

name:'Authentication',

status:'Healthy',

icon:'🔐'

}

];

}