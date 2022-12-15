import AdminLayout from '@/components/layouts/AdminLayout';
import React, { ReactElement } from 'react'

const Index = () => {
  return (
    <div>Admin index page modified admin index</div>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
  };

export default Index