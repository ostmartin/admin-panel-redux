import { useField } from "formik";

const CustomField = ({elem, label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className="mb-3">
                <label htmlFor={props.name} className="form-label fs-4">{label}</label>
                {elem === 'input' ? <input
                    className="form-control"
                    type='text'
                    {...field}
                    {...props}
                /> : <textarea
                    className="form-control"
                {...field}
                {...props}
            />}
            </div>
            {meta.touched && meta.error ? (
                <div className="error" style={{color: 'red'}}><em>{meta.error}</em></div>
            ) : null}
        </>
    )
}

export default CustomField;