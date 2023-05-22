"use strict";(self.webpackChunkts_user_rates=self.webpackChunkts_user_rates||[]).push([[602],{8602:function(e,s,n){n.r(s),n.d(s,{Component:function(){return E},ErrorBoundary:function(){return T}});var r=n(9439),t=n(2791),i=n(7689),a=n(7331),c=n(1889),o=n(9434),l=n(6615),d=n(2199),u=n(4518),x=n(7145),h=n(3494),f=n(184),g=function(){var e=(0,o.I0)(),s=l.$.useIsUsersListLoading(),n=(0,t.useCallback)((function(){e(l.$.getUserEntries({size:3,overwrite:!0}))}),[e]),r=(0,t.useCallback)((function(){e(l.$.getMoreUsers({size:6}))}),[e]);return(0,f.jsxs)(d.Z,{children:[(0,f.jsx)(u.Z,{disabled:s,variant:"contained",startIcon:(0,f.jsx)(x.Z,{}),onClick:n,children:"Reload Users"}),(0,f.jsx)(u.Z,{disabled:s,variant:"contained",startIcon:(0,f.jsx)(h.Z,{}),onClick:r,children:"Add More Users"})]})},j=n(7973),v=n(9984),m=n(2090),_="styles_ButtonBlock__0Fx7U",p=function(e){var s=e.user,n=(0,o.I0)(),r=(0,t.useCallback)((function(){n((0,j.updateUserRate)({id:s.id,modifier:1})),n((0,j.setLastRatingChange)(s.rating+1))}),[n,s.id,s.rating]),i=(0,t.useCallback)((function(){n((0,j.updateUserRate)({id:s.id,modifier:-1})),n((0,j.setLastRatingChange)(s.rating-1))}),[n,s.id,s.rating]),a=(0,t.useCallback)((function(){n((0,j.resetUserRating)({id:s.id}))}),[n,s.id]);return(0,f.jsxs)(d.Z,{color:"info",size:"small",className:_,children:[(0,f.jsx)(u.Z,{variant:"contained",onClick:i,title:"Decrease rating",children:(0,f.jsx)(v.Z,{})}),(0,f.jsx)(u.Z,{variant:"contained",onClick:r,title:"Increase rating",children:(0,f.jsx)(h.Z,{})}),s.isRated&&0===s.rating?(0,f.jsx)(u.Z,{variant:"contained",onClick:a,title:"Reset rating",children:(0,f.jsx)(m.Z,{})}):null]})},Z=n(9818),b="styles_DialogContent__AdIv-",C=function(e){var s=e.user,n=(0,o.I0)(),i=(0,t.useState)(!1),a=(0,r.Z)(i,2),c=a[0],l=a[1],d=(0,t.useState)(!1),x=(0,r.Z)(d,2),h=x[0],g=x[1];(0,t.useEffect)((function(){s.rating>=5&&l(!0),s.rating<=-5&&g(!0)}),[s.rating]);var v=(0,t.useCallback)((function(){l(!1)}),[]),m=(0,t.useCallback)((function(){g(!1)}),[]),_=(0,t.useCallback)((function(){n((0,j.resetUserRating)({id:s.id}))}),[n,s.id]);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Z.Z,{open:c,onClose:v,children:(0,f.jsxs)("div",{className:b,children:["Would you like to reward this user? :)",(0,f.jsx)(u.Z,{variant:"contained",onClick:_,children:"Reward user"})]})}),(0,f.jsx)(Z.Z,{open:h,onClose:m,children:(0,f.jsxs)("div",{className:b,children:["Would you like to BAN this user? >:|",(0,f.jsx)(u.Z,{variant:"contained",onClick:_,children:"Ban user"})]})})]})},y=n(3239),U=n(493),k=function(e){var s=e.rows,n=e.after;if(e.isFetching)return(0,f.jsx)(y.Z,{color:"primary"});var r=s.map((function(e){return(0,f.jsx)(l.p,{user:e,after:n},e.id)}));return(0,f.jsx)(U.Z,{children:r.length?r:"No User record available"})},N=n(1413),w=n(5987),L=n(4554),I=n(5228),R=n(3896),F=["children","value","index"];function $(e){var s=e.children,n=e.value,r=e.index,t=(0,w.Z)(e,F);return(0,f.jsx)("div",(0,N.Z)((0,N.Z)({role:"tabpanel",hidden:n!==r,id:"simple-tabpanel-".concat(r),"aria-labelledby":"simple-tab-".concat(r)},t),{},{children:n===r&&(0,f.jsx)(L.Z,{sx:{p:2},children:s})}))}var A=function(e){var s=e.tabs,n=e.content,r=e.activeTab,t=e.setActiveTab;return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(L.Z,{sx:{width:"100%",typography:"body1"},children:[(0,f.jsx)(L.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,f.jsx)(I.Z,{onChange:function(e,s){t(s)},"aria-label":"lab API tabs example",value:r,children:s.map((function(e,s){return(0,f.jsx)(R.Z,{value:s,label:e},s)}))})}),n.map((function(e,s){return(0,f.jsx)($,{index:s,value:r,children:e},s)}))]})})},B={main:"styles_main__SZPjT",description:"styles_description__A2dXy",code:"styles_code__RcfT8",grid:"styles_grid__FpXhn",card:"styles_card__NHzZ8",center:"styles_center__vf0i1",logo:"styles_logo__fBTFQ",content:"styles_content__1isLV",vercelLogo:"styles_vercelLogo__JAMYo",rotate:"styles_rotate__+NDCI"};function E(){var e=(0,o.I0)(),s=(0,t.useState)(0),n=(0,r.Z)(s,2),i=n[0],a=n[1],d=l.$.useIsUsersListLoading(),u=l.$.useUnratedUsers(),x=l.$.useUpVotedUsers(),h=l.$.useDownVotedUsers(),j=l.$.useLastRatingChange();return(0,t.useEffect)((function(){e(l.$.getUserEntries({size:3,overwrite:!1}))}),[e]),(0,t.useEffect)((function(){a(j>=0?0:1)}),[j]),(0,f.jsxs)("main",{className:B.main,children:[(0,f.jsx)(g,{}),(0,f.jsxs)(c.ZP,{container:!0,spacing:2,className:B.container,children:[(0,f.jsxs)(c.ZP,{className:B.UserListColumn,item:!0,sm:12,md:6,padding:5,children:[(0,f.jsx)("h3",{children:" Users with no rating "}),(0,f.jsx)(k,{rows:u,isFetching:d,after:[p]})]}),(0,f.jsx)(c.ZP,{className:B.UserListColumn,item:!0,sm:12,md:6,padding:5,children:(0,f.jsx)(A,{activeTab:i,setActiveTab:a,tabs:["UpVoted","DownVoted"],content:[(0,f.jsx)(k,{rows:x,isFetching:d,after:[p,C]}),(0,f.jsx)(k,{rows:h,isFetching:d,after:[p,C]})]})})]})]})}function T(){var e,s,n=(0,i.lk)();(0,a.WK)(n)?e=(null===(s=n.error)||void 0===s?void 0:s.message)||n.statusText:n instanceof Error?e=n.message:"string"===typeof n?e=n:(console.error(n),e="Unknown error");return(0,f.jsxs)("div",{id:"error-page",className:"flex flex-col gap-8 justify-center items-center h-screen",children:[(0,f.jsx)("h1",{className:"text-4xl font-bold",children:"Oops!"}),(0,f.jsx)("p",{children:"Sorry, an unexpected error has occurred."}),(0,f.jsx)("p",{className:"text-slate-400",children:(0,f.jsx)("i",{children:e})})]})}E.displayName="LazyUsersList",T.displayName="UsersListErrorBoundary"}}]);
//# sourceMappingURL=602.3e6cfc91.chunk.js.map