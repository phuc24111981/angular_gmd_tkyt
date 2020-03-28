import { Injectable } from '@angular/core';


@Injectable()
export class dbase 
{

    constructor() 
    { 

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