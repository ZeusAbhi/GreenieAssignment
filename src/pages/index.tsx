import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/Table'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/Modal'

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [input, setInput] = useState('');
  // this timeout is used to debounce the search input
  // so that we don't make a request on every keypress
  const timeout = useRef<NodeJS.Timeout>();
  const router = useRouter();
  // this state is used to show the modal
  // when a user is clicked, we set the user to show in the modal
  // and when the modal is closed, we set it back to null
  const [showModal, setShowModal] = useState<User | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      if (!input) {
        // if the input is empty, we redirect to the home page
        router.push('/');
        return;
      }
      if (input.length < 3) {
        // if the input is less than 3 characters, we don't make a request
        return;
      }
      router.push(`/?q=${input}`);
    }, 500);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  }, [input])

  useEffect(() => {
    if (router.query.q) {
      setInput(router.query.q as string);
    }
  }, [router.query.q])

  return (
    <>
      {showModal && <Modal visible={!!showModal} closeFunction={() => {
        setShowModal(null);
      }} >
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col-reverse md:flex-row md:items-center gap-2'>
            <h1 className='text-2xl font-bold'>User Details</h1>
            <button className='px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-md md:ml-auto' onClick={() => {
              setShowModal(null);
            }}>Close</button>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <h2 className='text-xl font-bold'>Name:</h2>
              <p className='text-xl ml-2'>{showModal.name}</p>
            </div>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <h2 className='text-xl font-bold'>Username:</h2>
              <p className='text-xl ml-2'>{showModal.username}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <h2 className='text-xl font-bold'>Email:</h2>
              <p className='text-xl ml-2'>{showModal.email}</p>
            </div>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <h2 className='text-xl font-bold'>Phone:</h2>
              <p className='text-xl ml-2'>{showModal.phone}</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <h2 className='text-xl font-bold'>Creation Date:</h2>
              <p className='text-xl ml-2'>{showModal.creationDate}</p>
            </div>
          </div>
        </div>
      </Modal>}

      <form className='flex w-full flex-col md:flex-row' onSubmit={(e) => {
        e.preventDefault();
        router.push(`/?q=${input}`);
      }}>
        <input value={input} onChange={(e) => {
          setInput(e.target.value);
        }} className='px-4 flex-1 py-2 border border-gray-200 dark:border-slate-600 rounded-t-md md:rounded-tr-none md:rounded-l-md outline-none' placeholder='Search' />
        <button className='px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-b-md md:rounded-bl-none md:rounded-r-md' onClick={() => {
          router.push(`/?q=${input}`);
        }}>Search</button>
      </form>
      <div className='w-full overflow-x-auto'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Creation Date</TableHeader>
              <TableHeader> </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => {
              return <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.creationDate}</TableCell>
                <TableCell><div className='cursor-pointer' onClick={() => {
                  setShowModal(user);
                }}>Show More</div> </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}


type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  creationDate: string;
}

/**
 * Returns a random date between 2012 and now
 * as a string in the format 'Mon, 01 Jan 2012'
*/
const randomDate = () => {
  const start = new Date(2012, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toUTCString().split(' ').slice(0, 4).join(' ');
}


export const getServerSideProps: GetServerSideProps<{
  data: User[]
}> = async (context) => {
  const query = context.query.q;
  let data: User[] = [];
  if (query) {
    // if query is present, fetch users with a search query
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`);
    data = await res.json() as User[];
    data.forEach((user) => {
      user.creationDate = randomDate();
    })
  } else {
    // else we fetch all users (only 10 for this example)
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    data = await res.json() as User[];
    data.forEach((user) => {
      user.creationDate = randomDate();
    })
  }
  return {
    props: {
      data
    }
  }
}
