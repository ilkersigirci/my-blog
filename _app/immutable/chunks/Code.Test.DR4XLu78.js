import{s as k,f as x,h as D,e as g,a as d,H as f,j as h,c as b,g as _,b as u,k as F,i,n as w,d as y}from"./scheduler.CdQmKKWn.js";import{S as L,i as T,c as I,a as P,m as j,t as M,b as H,d as S}from"./index.CCBradaN.js";import{g as U,a as A}from"./spread.CgU5AtxT.js";import{M as G}from"./mdsvex.CV_iWGZX.js";function R(c){let s,p="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",o,e,a="<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</li>",l,t,E=`<pre class="shiki one-dark-pro" style="background-color:#282c34;color:#abb2bf" tabindex="0"><code><span class="line"><span style="color:#C678DD">import</span><span style="color:#D19A66"> *</span><span style="color:#C678DD"> as</span><span style="color:#E06C75"> config</span><span style="color:#C678DD"> from</span><span style="color:#98C379"> '$lib/config'</span></span>
<span class="line"><span style="color:#C678DD">import</span><span style="color:#C678DD"> type</span><span style="color:#ABB2BF"> &#123; </span><span style="color:#E06C75">Post</span><span style="color:#ABB2BF"> &#125; </span><span style="color:#C678DD">from</span><span style="color:#98C379"> '$lib/types'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD">export</span><span style="color:#C678DD"> async</span><span style="color:#C678DD"> function</span><span style="color:#61AFEF"> GET</span><span style="color:#ABB2BF">(&#123; </span><span style="color:#E06C75;font-style:italic">fetch</span><span style="color:#ABB2BF"> &#125;) &#123;</span></span>
<span class="line"><span style="color:#C678DD">	const</span><span style="color:#E5C07B"> response</span><span style="color:#56B6C2"> =</span><span style="color:#C678DD"> await</span><span style="color:#61AFEF"> fetch</span><span style="color:#ABB2BF">(</span><span style="color:#98C379">'api/posts'</span><span style="color:#ABB2BF">)</span></span>
<span class="line"><span style="color:#C678DD">	const</span><span style="color:#E5C07B"> posts</span><span style="color:#ABB2BF">: </span><span style="color:#E5C07B">Post</span><span style="color:#ABB2BF">[] </span><span style="color:#56B6C2">=</span><span style="color:#C678DD"> await</span><span style="color:#E5C07B"> response</span><span style="color:#ABB2BF">.</span><span style="color:#61AFEF">json</span><span style="color:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD">	const</span><span style="color:#E5C07B"> headers</span><span style="color:#56B6C2"> =</span><span style="color:#ABB2BF"> &#123; </span><span style="color:#98C379">'Content-Type'</span><span style="color:#ABB2BF">: </span><span style="color:#98C379">'application/xml'</span><span style="color:#ABB2BF"> &#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD">	const</span><span style="color:#E5C07B"> xml</span><span style="color:#56B6C2"> =</span><span style="color:#98C379"> &#96;</span></span>
<span class="line"><span style="color:#98C379">		&#x3C;rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"></span></span>
<span class="line"><span style="color:#98C379">			&#x3C;channel></span></span>
<span class="line"><span style="color:#98C379">				&#x3C;title></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">title</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/title></span></span>
<span class="line"><span style="color:#98C379">				&#x3C;description></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">description</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/description></span></span>
<span class="line"><span style="color:#98C379">				&#x3C;link></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">url</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/link></span></span>
<span class="line"><span style="color:#98C379">				&#x3C;atom:link href="</span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">url</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">/rss.xml" rel="self" type="application/rss+xml"/></span></span>
<span class="line"><span style="color:#C678DD">				$&#123;</span><span style="color:#E06C75">posts</span></span>
<span class="line"><span style="color:#ABB2BF">					.</span><span style="color:#61AFEF">map</span><span style="color:#ABB2BF">(</span></span>
<span class="line"><span style="color:#ABB2BF">						(</span><span style="color:#E06C75;font-style:italic">post</span><span style="color:#ABB2BF">) </span><span style="color:#C678DD">=></span><span style="color:#98C379"> &#96;</span></span>
<span class="line"><span style="color:#98C379">						&#x3C;item></span></span>
<span class="line"><span style="color:#98C379">							&#x3C;title></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">post</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">title</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/title></span></span>
<span class="line"><span style="color:#98C379">							&#x3C;description></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">post</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">description</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/description></span></span>
<span class="line"><span style="color:#98C379">							&#x3C;link></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">url</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">/</span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">post</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">slug</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/link></span></span>
<span class="line"><span style="color:#98C379">							&#x3C;guid isPermaLink="true"></span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">config</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">url</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">/</span><span style="color:#C678DD">$&#123;</span><span style="color:#E5C07B">post</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">slug</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/guid></span></span>
<span class="line"><span style="color:#98C379">							&#x3C;pubDate></span><span style="color:#C678DD">$&#123;</span><span style="color:#C678DD">new</span><span style="color:#61AFEF"> Date</span><span style="color:#ABB2BF">(</span><span style="color:#E5C07B">post</span><span style="color:#ABB2BF">.</span><span style="color:#E06C75">date</span><span style="color:#ABB2BF">).</span><span style="color:#61AFEF">toUTCString</span><span style="color:#ABB2BF">()</span><span style="color:#C678DD">&#125;</span><span style="color:#98C379">&#x3C;/pubDate></span></span>
<span class="line"><span style="color:#98C379">						&#x3C;/item></span></span>
<span class="line"><span style="color:#98C379">					&#96;</span></span>
<span class="line"><span style="color:#ABB2BF">					)</span></span>
<span class="line"><span style="color:#ABB2BF">					.</span><span style="color:#61AFEF">join</span><span style="color:#ABB2BF">(</span><span style="color:#98C379">''</span><span style="color:#ABB2BF">)</span><span style="color:#C678DD">&#125;</span></span>
<span class="line"><span style="color:#98C379">			&#x3C;/channel></span></span>
<span class="line"><span style="color:#98C379">		&#x3C;/rss></span></span>
<span class="line"><span style="color:#98C379">	&#96;</span><span style="color:#ABB2BF">.</span><span style="color:#61AFEF">trim</span><span style="color:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD">	return</span><span style="color:#C678DD"> new</span><span style="color:#61AFEF"> Response</span><span style="color:#ABB2BF">(</span><span style="color:#E06C75">xml</span><span style="color:#ABB2BF">, &#123; </span><span style="color:#E06C75">headers</span><span style="color:#ABB2BF"> &#125;)</span></span>
<span class="line"><span style="color:#ABB2BF">&#125;</span></span></code><button class="copy" data-code="import * as config from &#x27;$lib/config&#x27;
import type &#123; Post &#125; from &#x27;$lib/types&#x27;

export async function GET(&#123; fetch &#125;) &#123;
	const response = await fetch(&#x27;api/posts&#x27;)
	const posts: Post[] = await response.json()

	const headers = &#123; &#x27;Content-Type&#x27;: &#x27;application/xml&#x27; &#125;

	const xml = &#x60;
		<rss xmlns:atom=&#x22;http://www.w3.org/2005/Atom&#x22; version=&#x22;2.0&#x22;>
			<channel>
				<title>$&#123;config.title&#125;</title>
				<description>$&#123;config.description&#125;</description>
				<link>$&#123;config.url&#125;</link>
				<atom:link href=&#x22;$&#123;config.url&#125;/rss.xml&#x22; rel=&#x22;self&#x22; type=&#x22;application/rss+xml&#x22;/>
				$&#123;posts
					.map(
						(post) => &#x60;
						<item>
							<title>$&#123;post.title&#125;</title>
							<description>$&#123;post.description&#125;</description>
							<link>$&#123;config.url&#125;/$&#123;post.slug&#125;</link>
							<guid isPermaLink=&#x22;true&#x22;>$&#123;config.url&#125;/$&#123;post.slug&#125;</guid>
							<pubDate>$&#123;new Date(post.date).toUTCString()&#125;</pubDate>
						</item>
					&#x60;
					)
					.join(&#x27;&#x27;)&#125;
			</channel>
		</rss>
	&#x60;.trim()

	return new Response(xml, &#123; headers &#125;)
&#125;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,C,B,$=`<pre class="shiki one-dark-pro" style="background-color:#282c34;color:#abb2bf" tabindex="0"><code><span class="line"><span style="color:#7F848E;font-style:italic"># Long variable scroll test</span></span>
<span class="line"><span style="color:#ABB2BF">longvariablename  </span><span style="color:#56B6C2">=</span><span style="color:#98C379"> "longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename"</span></span></code><button class="copy" data-code="# Long variable scroll test
longvariablename  = &#x22;longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename_longvariablename&#x22;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,m;return{c(){s=g("p"),s.textContent=p,o=d(),e=g("ul"),e.innerHTML=a,l=d(),t=new f(!1),C=d(),B=new f(!1),m=h(),this.h()},l(n){s=b(n,"P",{"data-svelte-h":!0}),_(s)!=="svelte-1vxrhn2"&&(s.textContent=p),o=u(n),e=b(n,"UL",{"data-svelte-h":!0}),_(e)!=="svelte-4uhk4n"&&(e.innerHTML=a),l=u(n),t=F(n,!1),C=u(n),B=F(n,!1),m=h(),this.h()},h(){t.a=C,B.a=m},m(n,r){i(n,s,r),i(n,o,r),i(n,e,r),i(n,l,r),t.m(E,n,r),i(n,C,r),B.m($,n,r),i(n,m,r)},p:w,d(n){n&&(y(s),y(o),y(e),y(l),t.d(),y(C),y(m),B.d())}}}function q(c){let s,p;const o=[c[0],v];let e={$$slots:{default:[R]},$$scope:{ctx:c}};for(let a=0;a<o.length;a+=1)e=x(e,o[a]);return s=new G({props:e}),{c(){I(s.$$.fragment)},l(a){P(s.$$.fragment,a)},m(a,l){j(s,a,l),p=!0},p(a,[l]){const t=l&1?U(o,[l&1&&A(a[0]),l&0&&A(v)]):{};l&2&&(t.$$scope={dirty:l,ctx:a}),s.$set(t)},i(a){p||(M(s.$$.fragment,a),p=!0)},o(a){H(s.$$.fragment,a),p=!1},d(a){S(s,a)}}}const v={title:"Code Test",description:"Code Test",date:"2024-7-25",categories:["programming"],published:!0};function z(c,s,p){return c.$$set=o=>{p(0,s=x(x({},s),D(o)))},s=D(s),[s]}class Q extends L{constructor(s){super(),T(this,s,z,q,k,{})}}export{Q as default,v as metadata};
