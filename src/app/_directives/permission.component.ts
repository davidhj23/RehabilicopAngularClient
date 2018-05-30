import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { UserService } from '../layout/seguridad/usuarios/user.service';

@Directive({
    selector: '[permission]'
})

export class PermissionComponent implements OnInit{    

    private el: HTMLElement;
    @Input() permission: string;

    constructor(private ref: ElementRef,
        private userService: UserService){ 
            this.el = this.ref.nativeElement;                  
    }

    ngOnInit(){
        if (localStorage.getItem('jwtToken')) {
            if(this.permission){           
                let result = this.userService.validatePermission(this.permission);
                if(result == true){                         
                    this.el.style.visibility = 'visible';                        
                }else{                    
                    this.el.style.display = 'none';                        
                }
            }
        }else{
            this.el.style.display = 'none';                        
        }
    }
}