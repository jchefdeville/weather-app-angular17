import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'minuteSeconds',
    standalone: true
})
export class MinuteSecondsPipe implements PipeTransform {

    transform(value: number): string {
        const minutes: number = Math.floor(value / 60);
        const seconds = value - minutes * 60;

        let transformation = `${minutes}min`;

        if (seconds > 0) {
            transformation += ` ${seconds}s`;
        }


        return transformation;
    }

}