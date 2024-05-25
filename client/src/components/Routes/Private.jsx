import React, { useContext, useEffect, useState } from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import axios from 'axios'
import { api_url } from '../../datas'
import { toast } from 'react-toastify'
import { userContext } from '../../context/user'

const Private = () => {
  const {user} = useContext(userContext)
  return (user?<Outlet />:<Navigate to="/login" />)
}

export default Private
