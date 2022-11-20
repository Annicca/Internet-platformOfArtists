import React from "react";
import classNames from "classnames";

export const EditIcon = ({className}) =>{
    const classes = classNames(
        className
    )

    return(
        <svg 
        width="24" 
        height="24" 
        className = {classes}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect x="0.0770264" y="0.230774" width="23.0769" height="23.0769" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_79_292" transform="scale(0.002)"/>
            </pattern>
            <image id="image0_79_292" width="500" height="500" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAABmJLR0QA/wD/AP+gvaeTAAAbsUlEQVR4nO3debhudV338c8+Bw7CYbQURxweB9QnJzTTnKccssFMMc1MBaxMLQfMHHDMzExLTU1Fn0pK1LLQFBUVBTUcyZwDQVJsUEBBPOHx+WPvA3t1Doe9133f37V+a79e1/X7gz/Ye33XfV37fda91n3/EgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCBloY+AADYjU1JDkiyb5KtK+uAJOcnuTDJRUm+u/Lf2wc6xlEQdADGYHOSWya5bZIbrlrXT7JlDf//tiRnJPnKqnVaks8k+eECjnd0BB2Aodw2yT2S3CnJHZPsv4DfcUGSjyT5cJL3ZznyAMCMbprkmCRfTvKjAdZZSV6e5NaLHhQApuZKSY5KcnqGifjlrdOTHLlyfADA5dg/yROSnJPh47279a0sv2tw5cWcBgBo09Ykz8vy/euhY72edUGS5ybZZ/6nBADa8oAkZ2b4OM+yzknyiHhwHIAN6KZJTsrwMZ7nOinJTeZ5kgBgzB6R5S95GTrAi1jfz/JzAAAwWfsnOS7DR7divT3JQfM5bQAwHrdJ+/fK17vOSHLYPE4eAIzBPdLeE+zzWt9Lct/ZTyEADOvhWf7e9KHDOuT6nySPmvVEAsBQnpDljU6GDuoY1vYkT53tdAJAvWMyfETHuJ40y0kFgEpifvlre5JH9j+1AFBDzK94bUtyn74nGAAWTczXvr4bH2kDYITEfP3rrPjyGQBGRMz7r+N7nG8AmDsxn309Zt1nHQDmSMznsy5Mcug6z/3MNlX/QgBG68KhD2Ai9knyyupfurn6FwIwWqcmuSjJvYY+kAm4XpLPJfnC0AcCwMb1lAz/tvUU1tlJtq7z3PfmCh2A/+3ULH9n+92HPpDGHZDkkiQfHPpAANjYXKnPvi5IcuB6T3wfrtABuDzuqc9uryTnJ/nI0AcCAK7UZ1vnJrnSus/6OrlCB+CKnJrk+3Gl3te+WX5A7lNDHwgAJMkzMvzVbqvrMz3ONwAszFMzfBxbXTfrcb7XzFvuAKzHKfH2e1/fTvKBoQ8CAFZzpb7+9dUkS31O9lq4Qgegj1Piy2fW68pJTkjyjUX8cEEHoK+T4+339Tojy/8YmjtBB2AW7qmvzw+SvHnogwCAy+Oe+trWeXExDcDIifra1q36nuDd8a8EAObllCTbk9xt6AMZuU8n+eS8f6igA0zPflneh3t7lp9Er3RyRP2KfCnJiUMfBADjs0+SI5K8J8tfXrLjrd1tSU7L8le2Xr34mJ6Z4d7SHvt6xwznFYCJemiSc3LFEbkwybOT7FF4bKK+6/X5WU4qANOyKcmLs/6YnJTl3b+qiPrO6+Isv34AbHCbkrwh/YNyUlypD70OmOmMAtC8TUmOzexBeVbxcYt6d11zttMJQMs2JXlj5hOUi5Jco/bwfU591brxjOcSgEbNM+Y71tNLJ1gm6svrsFlPJADt2ZzkTZl/VD5eOcQq3n5P7jTzWQSgKYuK+Y+y/Lb7UF8w9qw1HuNU121mP4UAtGKRMd+xhnzaeiO//e4eOsAGsTnJX2bxYdm/aqDLsVGv1D3lDrABVMX8vKqBrsBGjLrPoQNM3OYkf5WaqLy7aKa12EhR901xABO3Oclfpy4sR9SMtWYbJeq+yx1gwqpjfm6SvUsmW5+NEHW7rQFM1OYkb05tVA4vmayfqUf9JfM7VQCMxR5JjkttUF5WMtlsphz1o+Z4ngAYgSFi/sa080DWVKN+63meJACGVfk0+471hrQT8x2OzvABnuc6L8N9Ox8Acybm6zOlqJ8w53MDwECqn2ZvPeY7TCXqR8/7xABQb48kb0ltQF6f9mO+w7MzfJBnXTZlAWjcEFfmU4r5Di1fqX81ydL8TwkAVYb4nPkUY75Dq1F/3iJOBgA1xHwxWoz6zRZyJgBYuD2TvDW10Xhtph/zHVq6p/7ZBZ0DABZszyRvT200XpeNE/MdWrlSH9tGOACswRAx/4tsvJjvMPaon5vkSgubHoCFEPNhjDnqT1vg3AAswJ5J/i5iPpQxRv2CJAcucmgA5mtLkr9PbSz+PD7X/L+N7UG55y52XADmaUvqr8w30tPs6zWWK/Wzk2xd8KwAzMlQMXdlvntjiPqDFj4lAHMxxNvsYr52Q0b9/QXzATAHW5L8Q2oj8YqI+XoNcU/9oiQ3qRgOgNlsSfKO1EbiNRHzvqqv1I+sGQuAWQwR81dHzGdVFfXjqwYCoD8xb9uio35WkiuXTQNAL3sleWdqY/7yiPm8HZPFvFbfTXJY4RwA9DDEA3C+NGZx5n2lvi3JfUonAGDdhoj5n0TMF21eUd+e5JHFxw7AOm1J8o+pjzk15hH1J5cfNQDrMkTMX1oyGavNEvUXDXC8AKzDXhHzjaTPg3JiDjByYr4xrSfqYg4wcnslOSG1Mf/jkslYi7VE/dmDHR0AayLmJLuPupgDjNzeSU6MmLNsV1EXc4CR2zvJe1Mb85eUTMYsVkf9WQMfCwBXYIiY/2HJZMzDMUmeOfRBALB7+6Q+5n9UMhkAbBD7JHlfxBwAmiXmANC4fZKclNqYv7Bksum7XpK7Jrl3ktsl2XfYwwFgKEPE/AUlk03XNZK8OMnXs/O5vSTJB5I8NMnmoQ4QgFpbs/zHvzLmzy+ZbJqWkjw+yYVZ27n+RJKbDnKkAJQZIubPK5lsmjYleV3Wf87Pz/Jb8gBM0NYkH0xtzJ9bMtk0bUryxvQ/9+fFlTrA5Ih5WzYlOTazvwanxT11gMnYN8mHUhvz55RMNk2bkrwh83stHlJ7+AAswtbUP81uf+z+lpK8OvN9Pd5fOgEAc7dvkpNTG3O7cPW3KcnrM//X5JIs/8MOgAbtm+TDEfNWLCrmO9Zt6kYBYF72S33MbanZX9+Ppq1n3atsGgDmYojPmYt5f0tJXpXFv0Y/XTUQALPbL8lHUhvzZ5RMNk1LSV6bmtfpmkUzATCj/ZKcktqY/37JZNO0lOQ1qXmdziiaCYAZ7R8xb0llzH8UX70L0IT9k5ya2pg/vWSyaVrE58x3ty5IcpWSyQDobf8kH01tzN0z728pyStS+3odWTIZAL0dkPqYP61ksmmqepp99XpVyWQA9DZEzI8umWyahoj567P8+XYARmqImHsArr+lJH+W2tfr2Ig5wKgdkORjEfNWiDkAOxki5p5m70/MAdiJmLdlKcmfpvb1Oi7J5orhAOjngCQfT20cfq9ksmkScwB2IuZtWUry8tS+Xn+TZI+K4QDo58CIeUvEHICdDBFzXxrTn5gDsJMDk/xzxLwlL0rt6/W3EXOAURsi5r4BbjZiDkBHdcy3J3lCyWTT9QcRcwBWEfP2iDkAHQcmOS21MX98yWTTVR3zt0TMAUbtoIh5a14YMQdglSFi/tslk01XdcyPj5gDjJqYt+cFEXMAVjkoySci5i0RcwA6hoj540ommy4xB6DjKkk+GzFvyfNTG/O3JtmzZDIAerlKktNTG/PfKplsusQcgA4xb8/zUhvzt0XMAUZNzNsj5gB0DBHz3yyZbLrEHICOq0bMW/PciDkAq1w1yb9EzFtSHfMTkuxVMhkAvYh5e56T2pi/M2IOMGpDxPw3SiabLjEHoEPM2yPmAHRcNcnnUhvzx5ZMNl3HpDbm74qYA4zawRHz1og5AB1i3p6jI+YArFId8x8meWTJZNM1RMyvVDIZAL0cnORfUxvzXyuZbLqemtqY/1PEHGDUxLw9Yg5Ah5i35ykRcwBWqY75JRHzWVXH/N0Rc4BRu1rqY/6IksmmS8wB6Lhaks9HzFvy5Ig5AKsMEfNfLZlsuqpj/p6IOcCoXSvJVyLmLRFzADrEvD1PSn3M9y6ZDIBehoj5w0smmy4xB6Dj2hHz1vxuamN+YsQcYNSuneSrEfOWiDkAHWLeHjEHoGOImD+sZLLp+p3UxvxDSbaWTAZAL2LeHjEHoOOQ1Mf8V0omm64nRswBWOWQJP8WMW9JdcxPTrJvyWQA9CLm7RFzADqGiPlDSyabLjEHoEPM2/OEJNsj5gCsOCTJGamN+eElk03XUamN+Ycj5gCjdp3UxnxbkgeWTDZdR0bMAVhliJj/Yslk0yXmAHSIeXuqY/6RJPuVTAZAL0PE/BdKJpuuIyLmAKxynSRnRsxbIuYAdFw3tTH/QcR8VmIOQIeYt6c65qdEzAFGbYiY/3zJZNP1mCQ/jJgDsOKGSb4eMW+JmAPQccMk56Q25j9XMtl0PTpiDsAqYt6e6pifmmT/kskA6EXM2yPmAHSIeXseFTEHYJUbpT7mDyiZbLrEHICOGyX594h5S6pj/okkB5VMBkAvYt4eMQeg48YR89b8empj/smIOcCoVcf84iQ/WzLZdA0R8yuXTAZAL2LenkdGzAFYZYiY379ksukScwA6bpzkGxHzllTH/FMRc4BROzRi3prDk1wSMQdgRXXML0pyz5LJpkvMAegQ8/Y8JMn/pDbmP1YyGQC9iHl7qmP+6Yg5wKgdmuSbqQvDhRHzWYk5AB03SX3M71Ey2XQ9OGIOwCpi3h4xB6BjiJjfvWSy6RJzADpunuQ/I+YtqY75ZyLmAKN2i4h5a3459TH/8ZLJAOhFzNsj5gB0DBHzu5VMNl0PSm3MPxsxBxg1MW+PmAPQccuIeWvEHICOWyb5r9SF4XsR81lVx/zzSa5WMhkAvQwR87uWTDZdv5RkW+pesy9EzAFGTczbI+YAdIh5ex4YMQdglVtFzFsj5gB0DBHzu5RMNl1DxPzqJZMB0Mutkvx3xLwl1TH/YsQcYNSGiPmdSyabrvsnuThiDsCKW6c25ucn+amSyaZLzAHoEPP23C9iDsAq1TE/L2I+qyFifo2SyQDo5bCIeWvum9qYfyliDjBqhyX5dmpjfruSyaZLzAHoEPP2iDkAHWLeHjEHoOP2WX7CXMzbcZ8k30/da/bliDnAqA0R858smWy6hoj5NUsmA6AXMW+PmAPQcYfUxvw7EfNZiTkAHWLenp+JmAOwyh2SXJDamN+2ZLLpqo75VyLmAKP20xHz1tw7tTE/M8l1SyYDoBcxb091zL8WMQcYNTFvj5gD0DFEzG9TMtl0iTkAHXdMbcy/HTGf1b2SXBQxB2CFmLdniJhfr2QyAHq5Y5Lvpjbmh5VMNl3VMT8rYg4wamLeHjEHoONOEfPW3DnJ9yLmAKyojvl/JLl5yWTTJeYAdAwR858omWy6ql+zs5Jcv2QyAHq5c8S8NWIOQIeYt0fMAegQ8/ZUx/zsiDnAqFU/TPWtiPmsqj9OeHaS/1MyGQC93CX1Mf+/JZNNl5gD0FH9BSRiPjsxB6BDzNsj5gB03Dti3prqbWu/HjEHGLUhYn6zksmma4iY36BkMgB6uXeS70fMWyLmAHT8TGpjfm7EfFbVMf9mkpuUTAZAL2LenjtEzAFYZYiY37RksukScwA67hMxb011zM+NmAOMmpi35w5Jzo/XDIAVYt6e20fMAVilOubfjDDMSswB6Lhv6mPu/utsxByADjFvz2FJvh0xB2DFfZNcnLow+Dax2VXH3Lf2AYzc/SLmrRFzADrEvD23jpgDsEp1zM+OmM/q1kn+O2IOwIr7pz7m9saezRAxtwc9wIiJeXvEHIAOMW/PrVIb8/+ImAOM2gOTbIuYt2SImP9EyWQA9FId87Mi5rMScwA6fin1Mb9+yWTTdcsk/xUxB2CFmLdHzAHoeFDEvDViDkCHmLdniJjfvGQyAHoZIubXK5lsuqpj/u0sfx88ACP1oCT/EzFviZgD0PHLqY351yLms7pFxByAVcS8PbdI8p+pe82+k+Q2JZMB0IuYt0fMAeh4cOpjft2Syabr5hFzAFYR8/aIOQAd1TE/M2I+qyFiftuSyQDo5SER89bcJMk3I+YArKiO+ZeTXKtksuk6NGIOwCpDxPyaJZNNl5gD0HF4xLw11TE/L8lPlkwGQC9i3h4xB6Dj8CSXRMxbcmiSb0TMAVhRHfMvRcxndePUx/x2JZMB0Msjk/wwtTG/Rslk0yXmAHT8esS8NWIOQIeYt0fMAeh4VGpj/sWI+axunOTfU/eanZ/kp0omA6AXMW/PjSLmAKwi5u0RcwA6xLw91TH/XpI7l0wGQC+PTn3Mr14y2XSJOQAd1TH/QsR8VjdMfczvUjIZAL2IeXtumOSciDkAKx4TMW+NmAPQIebtGSLmdy2ZDIBejkh9zK9WMtl0iTkAHdUx/3zEfFY3SG3ML4yYA4zaEUm2R8xbct0kZ6Y25ncrmQyAXsS8PWIOQMeRqY35Z5P8eMlk03WdiDkAq1TH/DMR81mJOQAdR0XMWzNEzO9eMhkAvYh5e66T5IyIOQArxLw9Yg5Ax2NTG/NPR8xndUjEHIBVnpj6mP9YyWTTNUTM71EyGQC9PDF1URDz+aiO+UURc4BR+52IeWsOSfJvqY35PUsmA6AXMW+PmAPQUR3zT0XMZyXmAHT8bsS8NddObcwvTnL/kskA6GWImF+5ZLLpunaSr0bMAVjxpNTG/JMR81mJOQAdYt4eMQegQ8zbUx3zHyT52ZLJAOjlyRHz1lwrYg7AKtUx/0TEfFbXSvKV1Mb8ASWTAdDLU1If84NKJpsuMQegQ8zbI+YAdIh5e66W5PMRcwBWPDW1MT81yf4lk03XEDH/uZLJAOhFzNtzcMQcgFWOjpi35uAk/xoxB2BFdcxPiZjPSswB6BDz9gwR858vmQyAXoaI+X4lk02XmAPQcUxqY/6RiPmsqmO+LckvlEwGQC9i3h4xB6DjORHz1lw1yeci5gCsEPP2iDkAHdUx/3DEfFZDxPwXSyYDoJfnRsxbc9Uk/5K61+ySJIeXTAZAL0PEfN+SyaZLzAHoeF7EvDViDkBHdcxPjpjP6iqpj/lDSyYDoBcxb89VkpweMQdgxfMj5q0ZIua/UjIZAL2IeXvEHICOF6Q25h+KmM9KzAHoEPP2DBHzh5VMBkAvQ8R8a8lk03VQkk9EzAFY8cKIeWuGiPnDSyYDoJfqmJ+YZO+SyaZLzAHo+IOIeWvEHICO6pi/J2I+qwOTnBYxB2CFmLdniJj/aslkAKzbUpKXRcxbI+YAXErM2zREzB9RMhkA67aU5OWpjfm7k1ypYrgJOzDJP0fMAYiYt6o65j+MmAOM1hAx/6eI+ayGiPmvlUwGwLotJfnTiHlrxByAS4l5mw5I8vGIOQBZjvmfRcxbUx3z7UmOKpkMgHUbIubvipjPSswBuJSYt+mAJB9LbcwfWzIZAOu2lOQVqY/5XhXDTZiYA3ApMW/TEDH/jZLJAFi3pSSvTG3M3xkxn5WYA3ApMW/T/kk+GjEHIMPE/ISI+ayGiPlvlkwGwLqJeZvEHIBLLSV5VcS8NVuTfChiDkDEvFViDsClhoj525LsWTHchG1N8sHUxvy3SiYDYN2Wkvx5xLw1Yg7ApYaI+Vsj5rMaIuaPK5kMgHVbSvLqiHlrtib5QMQcgCSbkrwxtTE/PmI+KzEH4FJi3qYhYv7bJZMBsG6bkrwptTH/2yR7VAw3YfsmOTmuzAFYUb2fuZjPbojPmbsyBxixh6Q25m+JmM9qnyQnpTbmjy+ZDIBetiT5WsS8JWIOwE4elrowHBcxn9UQD8A9sWQyAGby9tSE4c1JNhfNNFX7pDbmP4qYAzRhc5LvZPFR8ADc7PZJ8v7UxvxpJZMBMLPbR8xbIOYA7NYzs9go/E3EfFb7JHlfxByA3VjkZ5jFfHZDxPz3SiYDYG62Jrk4Yj5We0fMAViD+2UxUfDRtNntneS9qY3500smA2DuXhoxHyMxB2BdTs/8w/DM0gmmZ+8kJ6Y25keXTAbAQhyc5W8AW0QgnlU4x5TsleSE1Mb890smA2BhFv11r6K+PmIOQC/HZvHBEPW1GSLmzyiZDICFOzs14RD13duS5B8j5gD0cGhqAyLquybmAMzkcamNiKjvbIiY+wQCwMT8feqDLuqXEXMAZla1Xaqo79qWJP8Q5xyAGVVslyowuybmAMzNordLFZpd25LkHXGOAZiTRW6XKji7NkTMn10yGQCDWOR2qaK+a2IOwNwtartUUd+1IWL+opLJABjUIrZLFfVd25L6jweKOcAGsYjtUkV9Z0PE/A9LJgNgcIvcLlXULyPmACzUordLFfVkzyR/l9pz9eKSyQAYjYrtUjdy1MUcgBJV26VuxKiLOQAlqrdL3UhRHyLmf1QyGQCjM8R2qRsh6nsmeXvEHIAiQ22XOuWob05yXGrPwUtKJgNglIbeLnWKURdzAMqNYbvUKUV9c5I3R8wBKDaW7VKnEPUhYv7HJZMBMHpj2i615aiLOQCDGeN2qS1GfXOSvy6aacd6aclkADRhrNulthR1MQdgcGPeLrWFqG9O8lfFs4g5ADsZ+3apY476EDH/kznPAMAEtLJd6hijLuYAjEZL26WOKeqbk/xl8TGLOQCXq7XtUscQ9SFi/rIkSz2PF4ANoMXtUoeM+hAxf3XEHIDdaHm71CGiLuYAjFLr26VWRn1zkv9XfEyviZgDsAZT2C61IupiDsBoTWm71EVGfXOSNxUfw2sj5gCs0dS2S11E1MUcgHXbo/j33bP497XkOVmO6w2SPKLw974qlz3XAABrMtXtUltdrswBWLepb5fa2vqLJJt2+4oBwC5shO1SW1liDjAxlX/U3T8fh9clOSrLm+MAwLptpO1Sx7peF1fmAMxgI26XOrYl5gATVvUH/p7xNPWQ3pDkyHibHWCyKoPOMN6Q5IiIOQBzsNG3Sx1qvT7eZgdgTmyXKuYALFjFH3xvt9c7Nt5mB9hQBH16jk3ymIg5AHNku9TadWy8zQ7AAtguVcwBKLDoAHi7vcYbkzw63mYHYEFsl7r4dVyWb20AwELsm+QHGT54U14vi7fZAVgw26Uubp2V5IFrfykAmLo9Fviz3T+fr/OTnJTk+CRvS7Jt2MMBYEwEfbwuSfLZJO9bWSdHxAG4HIvaAe3gJN9c4M+fqjNyWcBPzPJVOQBcoUVdodsudW2+leUr7/cleVeSc4Y9HABatcigs7MLk3w0l12FfyrLD7kBwEwWdRV9dpJrL+hnt8R9cABKLOIK/dBs7Ji7Dw5AuUUEfaO93e4+OACDW0TQ77aAnzkm5yf5YC67Cv/isIcDAIsJ+mEL+JlD2pbkY7ks4Kdl+d44AIzGIh6K25ZkzwX83ErugwPQlEVcobf4MSz3wQFo2iKCfm6SQxbwc+fJfXAAJmURQT8t4wu6++AAsE4Pz/Dbi25PcnqSl2Z5G9etC50YACZoryzfg66O+LlJ3pLkyCTXWviUALABPCSLD/j3krw3ydFZ/qiczWAAYAFemfkG/AdJPpTkmUlun8Xu5Q4ArNic2aLuPjgAjMiDk3w9a4v415Mcm+RhSQ4e4mABgMu3V5YjfXySryW5OMn3k5yZ5G1JHpflXdoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYO7+P1qq+13rceSjAAAAAElFTkSuQmCC"/>
            </defs>
        </svg>
    )
}