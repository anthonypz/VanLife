import React from 'react';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { requireAuth } from '~/utils.server';
import invariant from 'tiny-invariant';
import { createHostVan } from '~/models/van.server';

export async function loader(args: LoaderArgs) {
  await requireAuth(args);
  return {};
}

type ActionData =
  | {
      name: string | null;
      price: string | null;
      description: string | null;
      type: string | null;
    }
  | undefined;

export async function action(args: ActionArgs) {
  const hostId = await requireAuth(args);

  const formData = await args.request.formData();
  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');
  let imageUrl = formData.get('imageUrl');
  const type = formData.get('type');

  invariant(typeof name === 'string', 'name must be a string');
  invariant(typeof price === 'string', 'price must be a string');
  invariant(typeof description === 'string', 'description must be a string');
  invariant(typeof imageUrl === 'string', 'imageUrl must be a string');
  invariant(typeof type === 'string', 'type must be a string');

  if (
    typeof imageUrl !== 'string' ||
    imageUrl === '' ||
    !/^(ftp|http|https):\/\/[^ "]+$/.test(imageUrl)
  ) {
    imageUrl =
      'https://res.cloudinary.com/dyt5tdxun/image/upload/v1682360776/travelvan_uihhpb.jpg';
  }

  const errors: ActionData = {
    name: name ? null : 'name is required',
    price: price ? null : 'price is required',
    description: description ? null : 'description is required',
    type: type ? null : 'type is required',
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  const van = await createHostVan({
    name,
    price,
    description,
    imageUrl,
    type,
    hostId,
  });

  return redirect(`/host/vans/${van.id}`);
}

export default function NewVanPage() {
  const errors = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const typeRef = React.useRef<HTMLSelectElement>(null);

  const navigation = useNavigation();

  React.useEffect(() => {
    if (errors?.name) {
      nameRef.current?.focus();
    } else if (errors?.price) {
      priceRef.current?.focus();
    } else if (errors?.description) {
      descriptionRef.current?.focus();
    } else if (errors?.type) {
      typeRef.current?.focus();
    }
  }, [errors]);

  return (
    <div className='p-2 sm:p-6'>
      <h1 className='text-2xl font-bold my-4'>Create Van Listing</h1>
      <Form
        method='post'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%',
        }}
      >
        <div>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>
              Van name:{' '}
            </span>
            <input
              ref={nameRef}
              name='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.name ? true : undefined}
              aria-errormessage={errors?.name ? 'name-error' : undefined}
            />
          </label>
          {errors?.name && (
            <div
              className='pt-1 text-red-700 text-sm'
              id='name-error'
            >
              {errors.name}
            </div>
          )}
        </div>

        <div className='mt-2'>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>Price: </span>
            <input
              ref={priceRef}
              name='price'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.price ? true : undefined}
              aria-errormessage={errors?.price ? 'price-error' : undefined}
            />
          </label>
          {errors?.price && (
            <div
              className='pt-1 text-red-700 text-sm'
              id='price-error'
            >
              {errors.price}
            </div>
          )}
        </div>

        <div className='mt-2'>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>
              Description:{' '}
            </span>
            <input
              ref={descriptionRef}
              name='description'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.description ? true : undefined}
              aria-errormessage={
                errors?.description ? 'description-error' : undefined
              }
            />
          </label>
          {errors?.description && (
            <div
              className='pt-1 text-red-700 text-sm'
              id='description-error'
            >
              {errors.description}
            </div>
          )}
        </div>

        <div className='mt-2'>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>
              Image URL (optional):{' '}
            </span>
            <input
              name='imageUrl'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
            />
          </label>
        </div>

        <div className='mt-2'>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>Type: </span>
            <select
              ref={typeRef}
              name='type'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.type ? true : undefined}
              aria-errormessage={errors?.type ? 'type-error' : undefined}
            >
              <option value=''>--Please choose an option--</option>
              <option value='simple'>Simple</option>
              <option value='luxury'>Luxury</option>
              <option value='rugged'>Rugged</option>
            </select>
          </label>
          {errors?.type && (
            <div
              className='pt-1 text-red-700 text-sm'
              id='type-error'
            >
              {errors.type}
            </div>
          )}
        </div>

        <div className='text-right mt-2'>
          <Link
            to='/host'
            className='text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 '
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='rounded font-medium text-sm bg-[#f3761b] py-2.5 px-5 mr-2 mb-2 text-white hover:bg-[#f3761b]/80 focus:bg-[#f3761b] focus:ring-4 focus:ring-[#f3761b]/40'
          >
            {navigation.state === 'submitting'
              ? 'Creating...'
              : 'Create Listing'}
          </button>
        </div>
      </Form>
    </div>
  );
}
