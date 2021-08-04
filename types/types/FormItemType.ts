import {isString} from "../../../ts/modules/lodash";

/**
 * If you add more fields, make sure to update ./FormFieldType.ts also.
 */
export enum FormItemType {

    // Fields
    TEXT_FIELD       = "text-field",
    PASSWORD_FIELD   = "password-field",
    EMAIL_FIELD      = "email-field",
    SELECT_FIELD     = "select-field",
    CHECKBOX_FIELD   = "checkbox-field",
    TEXT_AREA_FIELD  = "text-area-field",
    INTEGER_FIELD    = "integer-field",

    // Non-fields
    PAGE_BREAK = "page-break"

}

export function isFormItemType (value: any) : value is FormItemType {

    if (!isString(value)) return false;

    switch (value) {

        case FormItemType.TEXT_FIELD:
        case FormItemType.PASSWORD_FIELD:
        case FormItemType.EMAIL_FIELD:
        case FormItemType.CHECKBOX_FIELD:
        case FormItemType.TEXT_AREA_FIELD:
        case FormItemType.INTEGER_FIELD:
        case FormItemType.PAGE_BREAK:
            return true;

        default: return false;
    }

}

export default FormItemType;
