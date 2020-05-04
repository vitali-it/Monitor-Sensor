import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'invalidmessage',
    pure: false
})
export class ValidationPipe implements PipeTransform {

    transform(value: any) {
        const min = 'min';
        const max = 'max';
        const minlength = 'minlength';
        const maxlength = 'maxlength';
        const requiredLength = 'requiredLength';

        if (value.getError(`required`)) {
            return `The field is mandatory`;
        } else if (value.getError(maxlength)) {
            return `The field cannot exceed ${value.getError(maxlength)[requiredLength]} characters`;
        } else if (value.getError(minlength)) {
            return `The field requires at least ${value.getError(minlength)[requiredLength]} characters`;
        } else if (value.getError(max)) {
            return `The number cannot exceed ${value.getError(max)[max]}`;
        } else if (value.getError(min)) {
            return `The number cannot be less than ${value.getError(min)[min]}`;
        }
    }
}
