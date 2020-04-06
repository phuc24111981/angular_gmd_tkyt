import { Injectable } from '@angular/core';


@Injectable()
export class dbase 
{

    constructor() 
    { 

    }

    public static logout()
    {
        this.clearUser();
        this.clearType();
    }

    public static setUser(usercode: string) 
    {
        localStorage.setItem('user', usercode);
    }

    public static clearUser()
    {
        localStorage.removeItem('user');
    }

    public static getUser()
    {
        return localStorage.getItem('user');
    }



    public static setType(type: string) 
    {
        localStorage.setItem('type', type);
    }

    public static clearType()
    {
        localStorage.removeItem('type');
    }

    public static getType()
    {
        return localStorage.getItem('type');
    }

    public static checkType(): boolean
    {
        var result: boolean = false;

        if(localStorage.getItem('type') != null && localStorage.getItem('type') != '' && localStorage.getItem('type') != '0' && localStorage.getItem('type') != '1')
        {
            result = true;
        }

        return result;
    }



    public static checkLogin(): boolean
    {
        var result: boolean = false;

        if(localStorage.getItem('user') != null && localStorage.getItem('user') != '')
        {
            result = true;
        }

        return result;
    }

}