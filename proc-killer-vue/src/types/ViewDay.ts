import * as moment from 'moment';

export class ViewDay {
    no: number;
    name: string;
    date: string;
    viewDate: string

    constructor(_no: number, _name: string)
    {
        this.no = _no;
        this.name = _name;
        this.date = moment().startOf('week').add('days', _no).format('YYYY-MM-DD[T00:00:00]');
        this.viewDate = moment().startOf('week').add('days', _no).format('DD-MM-YYYY'); 
    }
}