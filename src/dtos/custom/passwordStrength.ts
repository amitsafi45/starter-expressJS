import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import messages from '../../constants/messages';
import { PASSWORD_REGEX } from '../../constants/regex';

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPassword implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return PASSWORD_REGEX.test(text);;
    }

    defaultMessage(args: ValidationArguments) {
        // * Here you can provide default error message if validation failed
        return messages["passwordStrength"];
    }
}