import { FieldValues, useForm } from 'react-hook-form';
import Input from './components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const VALIDATION_MESSAGE_NAME = 'Digite um nome válido';
const VALIDATION_MESSAGE_EMAIL = 'Digite um email válido';
const VALIDATION_MESSAGE_PRICE = 'Digite um preço válido';

const signUpschema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGE_NAME),
  email: z.string().email(VALIDATION_MESSAGE_EMAIL),
  price: z.coerce
    .number({ invalid_type_error: VALIDATION_MESSAGE_PRICE })
    .min(1, VALIDATION_MESSAGE_PRICE),
});

function App() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(signUpschema),
    defaultValues: {
      name: '',
      email: '',
      price: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    reset();
  };

  return (
    <div className="m-10 w-[400px] flex flex-col gap-4">
      <Input
        id="name"
        errors={errors}
        register={register}
        label="Nome"
        type="text"
        disabled={isSubmitting}
      />
      <Input
        id="email"
        errors={errors}
        register={register}
        label="Email"
        type="email"
        disabled={isSubmitting}
      />
      <Input
        id="price"
        errors={errors}
        register={register}
        label="Preço"
        type="number"
        disabled={isSubmitting}
      />
      <button
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type="submit"
        className="bg-blue-200 p-2 rounded hover:bg-blue-300 transition disabled:bg-gray-300"
      >
        Enviar
      </button>
    </div>
  );
}

export default App;
