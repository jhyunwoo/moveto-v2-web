import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 모베토 Moveto',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full px-4 py-20 text-text-secondary">
      <div className="brutalist-card mx-auto max-w-3xl rounded-2xl p-6 md:p-10">
        <h1 className="mb-8 font-display text-3xl font-800 tracking-tight text-text-primary">개인정보처리방침</h1>

        <div className="flex flex-col gap-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">1. 총칙</h2>
            <p>
              모베토(이하 &apos;회사&apos;)는 이용자의 개인정보를 소중히 다루며, &quot;정보통신망 이용촉진 및 정보보호
              등에 관한 법률&quot; 등 모든 관련 법령을 준수하기 위해 노력하고 있습니다. 회사는 본 개인정보처리방침을
              통하여 이용자께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
              조치가 취해지고 있는지 알려드립니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">2. 수집하는 개인정보의 항목</h2>
            <p className="mb-2">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.</p>
            <ul className="list-inside list-disc space-y-1">
              <li>수집항목: 접속 로그, 쿠키, 접속 IP 정보, 브라우저 정보, 운영체제 정보</li>
              <li>수집방법: 홈페이지 및 서비스 이용 과정에서 생성되어 수집</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">3. 개인정보의 수집 및 이용목적</h2>
            <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>서비스 검색 및 파일 전송 기능 제공</li>
              <li>서비스 이용에 따른 본인확인, 개인식별, 부정이용방지</li>
              <li>고충처리 및 공지사항 전달</li>
              <li>서비스 개선 및 신규 서비스 개발을 위한 통계/분석</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">4. 개인정보의 보유 및 이용기간</h2>
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
              보유·이용기간 내에서 개인정보를 보유·이용합니다.
              <br />
              원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에
              의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">
              5. 이용자 및 법정대리인의 권리와 그 행사방법
            </h2>
            <p>
              이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할
              수 있으며 가입해지를 요청할 수도 있습니다. 개인정보의 조회/수정을 위해서는
              &apos;개인정보변경&apos;(또는 &apos;회원정보수정&apos; 등)을, 가입해지(동의철회)를 위해서는
              &apos;회원탈퇴&apos;를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">6. 개인정보 보호책임자</h2>
            <p className="mb-2">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
              등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="rounded-xl border-2 border-border-primary bg-surface p-4">
              <ul className="space-y-1">
                <li>책임자: Moveto Team</li>
                <li>
                  연락처:{' '}
                  <a href="mailto:support@moveto.kr" className="font-display font-600 text-accent hover:underline">
                    support@moveto.kr
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="border-t-2 border-border-primary pt-8">
            <p>본 방침은 2024년 1월 1일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
