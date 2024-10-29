import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'hourMinutes',
    standalone: true
})
export class HourMinutesPipe implements PipeTransform {

    transform(value: number): string {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60) + 1; // HARCODE + 1 to diplay sunset-sunrise

        let transformation = `${hours}h ${minutes}min`;

        return transformation;
    }

}