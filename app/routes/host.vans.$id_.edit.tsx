import React from 'react';
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { requireAuth } from '~/utils.server';
import invariant from 'tiny-invariant';
import { updateHostVan, deleteHostVan, getVan } from '~/models/van.server';

export async function loader(args: LoaderArgs) {
  const clerkHostId = await requireAuth(args);
  const id = args.params.id;
  invariant(typeof id === 'string', `params.id is required`);
  const van = await getVan(id);

  if (van?.hostId !== clerkHostId) {
    throw redirect('/host');
  }
  return { van, id };
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
  await requireAuth(args);
  const id = args.params.id;
  invariant(typeof id === 'string', 'id must be a string');

  const formData = await args.request.formData();

  const intent = formData.get('intent');

  // if (intent === "cancel") {
  //   return redirect(`/host/vans/${id}`)
  // }

  if (intent === 'delete') {
    await deleteHostVan(id);
    return redirect('/host/vans');
  }

  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');
  let imageUrl = formData.get('imageUrl');
  const type = formData.get('type');

  invariant(typeof name === 'string', 'name must be a string');
  invariant(typeof price === 'string', 'price must be a string');
  invariant(typeof description === 'string', 'description must be a string');
  // invariant(typeof imageUrl === "string", "imageUrl must be a string")
  invariant(typeof type === 'string', 'type must be a string');
  if (typeof imageUrl !== 'string' || imageUrl === '') {
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

  const van = await updateHostVan({
    id,
    name,
    price,
    description,
    imageUrl,
    type,
  });

  return redirect(`/host/vans/${van.id}`);
}

export default function EditVanPage() {
  const { van, id } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const typeRef = React.useRef<HTMLSelectElement>(null);

  const navigation = useNavigation();
  const isUpdating = navigation.formData?.get('intent') === 'update';
  const isDeleting = navigation.formData?.get('intent') === 'delete';

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
    <div className='px-2 sm:px-6'>
      <h1 className='text-2xl font-bold my-4'>Edit Van Listing</h1>
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
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.name ? true : undefined}
              aria-errormessage={errors?.name ? 'name-error' : undefined}
              defaultValue={van.name}
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
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.price ? true : undefined}
              aria-errormessage={errors?.price ? 'price-error' : undefined}
              defaultValue={van.price}
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
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.description ? true : undefined}
              aria-errormessage={
                errors?.description ? 'description-error' : undefined
              }
              defaultValue={van.description}
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
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              defaultValue={van.imageUrl}
            />
          </label>
        </div>

        <div className='mt-2'>
          <label className='flex w-full flex-col gap-1'>
            <span className='text-sm font-medium text-gray-900'>Type: </span>
            <select
              ref={typeRef}
              name='type'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5'
              aria-invalid={errors?.type ? true : undefined}
              aria-errormessage={errors?.type ? 'type-error' : undefined}
              defaultValue={van.type}
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
          <Link to={`/host/vans/${id}`}>
            <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2'>
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            name='intent'
            value='delete'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 '
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            type='submit'
            name='intent'
            value='update'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 '
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  );
}
