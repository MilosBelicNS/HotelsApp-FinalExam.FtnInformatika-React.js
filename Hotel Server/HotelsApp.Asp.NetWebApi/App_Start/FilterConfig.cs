﻿using System.Web;
using System.Web.Mvc;

namespace HotelsApp.Asp.NetWebApi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
