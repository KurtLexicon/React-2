
import { redirect } from 'react-router-dom'
import { deletePerson} from '../persons'

export async function action({ params }) {
    await deletePerson(params.id)
    redirect('/personList')
}
