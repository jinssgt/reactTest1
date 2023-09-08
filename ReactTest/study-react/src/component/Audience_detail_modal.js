import { useEffect, useState } from "react";

const AudienceDetailModal = () => {

    const [audienceDetail, setAudienceDetail] = useState([]);
    const [audiencePage, setAudiencePage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This effect will run once when the component mounts
        fetchAudienceUserDetail();
        fetchAudienceUserPage();
    }, []); // Provide an empty dependency array

    const fetchAudienceUserDetail = async () => {
            const clientSeq = 106659;
            const dpuid = 'dQkgV32l2s4yi9we9Beux4dvxezdFmDTcY971bs4';
        const response = await fetch(`https://api.logger.co.kr/tam-audience/user-detail?clientSeq=${clientSeq}&dpuid=${dpuid}`)
        .then((response) => response.json());

        setAudienceDetail(response.data);
        setIsLoading(false);
        console.log('audience detail data', audienceDetail && audienceDetail.length > 0 ? audienceDetail[0].sex : 'Data not available');
    }

    useEffect(()=>{
        console.log('audience detail data 2', audienceDetail && audienceDetail.length > 0 ? audienceDetail[0].last_order : 'Data not available');
        console.log('audience page data', audiencePage);
    }, [audienceDetail, audiencePage]);

    const fetchAudienceUserPage = async () => {
        const clientSeq = 106659;
        const dpuid = 'dQkgV32l2s4yi9we9Beux4dvxezdFmDTcY971bs4';
        const response = await fetch(`https://api.logger.co.kr/tam-audience/user-page?clientSeq=${clientSeq}&dpuid=${dpuid}`)
        .then((response) => response.json());

        setAudiencePage(response.data);
    }




    return (
        // <!-- 오디언스 상세 modal -->
	<div class="modal fade PrimaryModalhdbgcl default-popup-PrimaryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
	<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<h4 class="modal-title" id="myLargeModalLabel">오디언스 상세</h4> 
				</div>

				<div class="modal-body">
					
					<div>
						<h4 class="b fl">UID123<small>Last Update : 2023-09-04 13:42</small></h4>
						<div class="fr mt10"><span class="label label-success label-rouded"><i class="ti-face-smile"></i> 상위 10%</span> <span class="label label-warning label-rouded"><i class="ti-face-smile"></i> 상위 50%</span> <span class="label label-danger label-rouded"><i class="ti-face-sad"></i> 상위 90%</span></div>
						{isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <table class="user_th">
							<tr>
								<th>이름</th>
								<td>**아직없음**</td>
								<th>성별</th>
								<td>{audienceDetail ? audienceDetail[0].sex : '--'}</td>								
							</tr>
							<tr>
								<th>이메일</th>
								<td>**아직없음**</td>
								<th>전화번호</th>
								<td>**아직없음**</td>
							</tr>
							<tr>
								<th>디바이스</th>
								<td>{audienceDetail ? audienceDetail[0].device : '--'}</td>
								<th>지역</th>
								<td>{audienceDetail ? audienceDetail[0].region : '--'}</td>
							</tr>
							<tr>
								<th>최근 반응한 캠페인</th>
								<td>**아직없음**</td>
								<th>최근 주문일</th>
								<td>{audienceDetail ? audienceDetail[0].last_order : '--'}</td>
							</tr>
							<tr>
								<th>마지막 방문일</th>
								<td>{audienceDetail ? audienceDetail[0].last_visit : '--'}</td>
								<th>마지막 광고 유입매체</th>
								<td>**아직없음**</td>
							</tr>
							<tr>								
							</tr>
							<tr>
								<th class="bd-b">누적 방문횟수</th>
								<td class="bd-b">{audienceDetail ? audienceDetail[0].ltv_visit : '--'}</td>
								<th class="bd-b">누적 주문횟수</th>
								<td class="bd-b">{audienceDetail ? audienceDetail[0].ltv_order: '--'}</td>
							</tr>
						</table>
                        )}
					</div>


					<div class="chat-discussion mt20" style={{height: "auto"}}>
						<div id="myChart11" class="chart--container"  style={{minHeight:"350px;"}}></div>
					</div>


				  {/* <!-- user_view --> */}
					<div class="inbox-body">
					  <div class="sender-info">
						<div class="row">
						  <div class="col-md-12 mb10">
							<span class="t_blue"><strong class="font16">최근 7일간 서핑 경로</strong> <span class="font13"><span class="t-blue b ml10 t-line">최근 2일 동안 5개의 페이지를 이동하며 총 6분 4초</span>를 머물렀습니다.</span></span>
						  </div>
						</div>
					  </div>
					  <div class="col-lg-12">
						<div class="data-ep-table mb30">
							<div class="table-stlist">							
								<table class="table table-bordered table-striped" cellspacing="0" width="100%">
									<thead>
										<tr>
											<th>조회 일자</th>
											<th>조회 시각</th>
											<th>페이지</th>
											<th>머문 시간</th>
											<th>조회 콘텐츠</th>	
											<th>브랜드/상품명</th>
											<th>주문 상품</th>
											<th>내부 검색어</th>
										</tr>
									</thead>
									<tbody>
										{/* <tr>
											<td class="tc bg-green">2023-09-02</td>
											<td class="tc">12:10:06</td>
											<td>101초</td>
											<td class="tl">로그인 화면</td>
											<td class="tl">-</td>
											<td class="tl">-</td>
											<td class="tl">-</td>		
											<td class="tl">-</td>	
										</tr>
										<tr>
											<td class="tc">2023-09-02</td>
											<td class="tc">11:11:11</td>
											<td>32초</td>
											<td class="tl">로그인 화면</td>
											<td class="tl">-</td>
											<td class="tl">-</td>
											<td class="tl">-</td>		
											<td class="tl">-</td>	
										</tr>
										<tr>
											<td class="tc bg-green">2023-09-01</td>
											<td class="tc">14:10:06</td>
											<td>101초</td>
											<td class="tl">로그인 화면</td>
											<td class="tl">-</td>
											<td class="tl">-</td>
											<td class="tl">-</td>		
											<td class="tl">-</td>	
										</tr>
										<tr>
											<td class="tc">2023-09-01</td>
											<td class="tc">14:08:30</td>
											<td>96초</td>
											<td class="tl">로그인 화면</td>
											<td class="tl">-</td>
											<td class="tl">-</td>
											<td class="tl">-</td>		
											<td class="tl">-</td>	
										</tr>
										<tr>
											<td class="tc">2023-09-01</td>
											<td class="tc"><span class="bg-blue">14:07:36</span></td>
											<td>54초</td>
											<td class="tl">로그인 화면</td>
											<td class="tl">-</td>
											<td class="tl">-</td>
											<td class="tl">-</td>	
											<td class="tl">-</td>	
										</tr> */}
                                        {audiencePage.map((page, index) => (
                                            <tr key={index}>
                                                <td class="tc">{page.view_date}</td>
                                                <td class="tc">{page.view_time}</td>
                                                <td class="tl">{page.dp}</td>
                                                <td>{page.vs}</td>
                                                <td class="tl">{page.cp}</td>
                                                <td class="tl">{page.mf}</td>
                                                <td class="tl">{page.op}</td>
                                                <td class="tl">{page.kw_inner}</td>
                                            </tr>
                                        ))}
									</tbody>
								</table>
							</div>
						</div>
						{/* <!-- /data table --> */}

					</div>
					  {/* <!-- div class=""> 
						 <ul class="list-unstyled timeline">
							<li>
							  <div class="block">
								<div class="tags">
								  <a href="" class="tag">
									<span>06:10 PM</span>
								  </a>
								</div>
								<div class="block_content">
								  <h2 class="title"></h2>
								  <p class="excerpt"><a href="#"><span class="users_box">http://daum.net</span></a><i class="fa fa-chevron-right"></i><a href="#" ><span class="users_box">https://www.lpoint.com/</span></a></p>
								</div>
							  </div>
							</li>
							<li>
							  <div class="block">
								<div class="tags">
								  <a href="" class="tag">
									<span>07:10 PM</span>
								  </a>
								</div>
								<div class="block_content">
								  <h2 class="title"></h2>
								  <p class="excerpt"><a href="#"><span class="users_box">https://www.google.co.kr/</span></a><i class="fa fa-chevron-right"></i><a href="#" "><span class="users_box">http://naver.com</span></a><i class="fa fa-chevron-right"></i><a href="#"><span class="users_box">https://www.lpoint.com/</span></a></p>
								</div>
							  </div>
							</li>
						  </ul>
					  </div>
					</div --> */}
				  </div>
				  {/* <!-- /user_view --> */}
				  <div class="modal-footer pr0">
					<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
					<button type="button" class="pd-setting-ed btn-main-bg btn btn-info">저장</button>
				</div>
			</div>
		</div>
	</div>
    </div>
	// <!-- // 오디언스 상세 modal -->
    )
}
export default AudienceDetailModal;